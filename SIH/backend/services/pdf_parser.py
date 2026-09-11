import json
import re
import os
from pypdf import PdfReader
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class GovtPDFParser:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY missing in .env file!")
        genai.configure(api_key=api_key)

    def _get_working_model_name(self) -> str:
        try:
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    if 'flash' in m.name or 'pro' in m.name:
                        return m.name
            for m in genai.list_models():
                if 'generateContent' in m.supported_generation_methods:
                    return m.name
        except Exception as e:
            print(f"Error fetching models dynamically: {e}")
        
        return "models/gemini-1.5-flash"

    def extract_text_from_pdf_bytes(self, pdf_bytes) -> str:
        reader = PdfReader(pdf_bytes)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text

    def parse_pdf_to_json(self, pdf_bytes) -> dict:
        raw_text = self.extract_text_from_pdf_bytes(pdf_bytes)

        prompt = f"""
        Analyze the following text carefully:
        "{raw_text}"

        First, check if this text is a valid Government Project Execution Plan / Work Assignment document.
        
        If it is NOT a valid execution plan (e.g., certificate, random code, assignment, general article, unrelated document):
        Return ONLY this JSON:
        {{
            "is_valid_document": false,
            "error_reason": "Uploaded document is not a valid Project Execution Plan."
        }}

        If it IS a valid project execution plan document:
        Return ONLY a raw valid JSON matching this exact structure:
        {{
            "is_valid_document": true,
            "project_id": "string",
            "project_name": "string",
            "project_location": "string",
            "department": "string",
            "project_manager_name": "string",
            "project_monitor": "string",
            "assigned_site_manager": "string",
            "reporting_cycle_id": "string",
            "overall_project_status": "string",
            "reporting_frequency": "DAILY | WEEKLY | MONTHLY",
            "period_from": "YYYY-MM-DD",
            "period_to": "YYYY-MM-DD",
            "submission_deadline": "YYYY-MM-DD",
            "tasks": [
                {{
                    "activity_code": "string",
                    "wbs_level": "string",
                    "discipline": "string",
                    "activity_name": "string",
                    "location": "string",
                    "activity_description": "string",
                    "planned_start": "YYYY-MM-DD",
                    "planned_finish": "YYYY-MM-DD",
                    "baseline_progress_before_period": 0.0,
                    "target_progress_this_period": 100.0,
                    "planned_quantity": 500.0,
                    "target_quantity_this_period": 500.0,
                    "unit": "string",
                    "priority": "HIGH",
                    "responsible_site_lead": "string"
                }}
            ],
            "drawings": [],
            "planned_resources": [],
            "budget": {{
                "project_approved_budget": 0.0,
                "budget_used_before_period": 0.0,
                "budget_allocated_this_period": 0.0,
                "material_budget": 0.0,
                "labour_budget": 0.0,
                "equipment_budget": 0.0,
                "other_budget": 0.0
            }},
            "known_constraints": [],
            "risk_description": "string"
        }}
        """

        model_name = self._get_working_model_name()
        model = genai.GenerativeModel(model_name)
        
        try:
            response = model.generate_content(
                prompt,
                generation_config={"response_mime_type": "application/json"}
            )
        except Exception:
            response = model.generate_content(prompt)

        clean_text = response.text.strip()
        clean_text = re.sub(r"^```json\s*", "", clean_text, flags=re.IGNORECASE)
        clean_text = re.sub(r"^```\s*", "", clean_text)
        clean_text = re.sub(r"\s*```$", "", clean_text)

        parsed_json = json.loads(clean_text)

        if not parsed_json.get("is_valid_document", True):
            raise ValueError(parsed_json.get("error_reason", "Invalid document format"))

        return parsed_json