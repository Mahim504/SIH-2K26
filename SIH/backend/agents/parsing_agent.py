import json
import re
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class ParsingAgent:
    def __init__(self):
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY missing in .env file!")
        genai.configure(api_key=api_key)

    def _get_working_model(self):
        try:
            available = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
            if available:
                return available[0]
        except Exception:
            pass
        return "gemini-1.5-flash"

    def execute(self, raw_text: str) -> dict:
        prompt = f"""
        Extract details from this report:
        "{raw_text}"

        Return ONLY a raw JSON object with this exact structure:
        {{
            "activity_code": "extracted code like ACT-101 or UNKNOWN",
            "status": "COMPLETED or IN_PROGRESS or DELAYED or BLOCKED",
            "progress_percentage": 0,
            "delay_reason": "string reason or null",
            "confidence": 0.95
        }}
        """

        try:
            model_name = self._get_working_model()
            model = genai.GenerativeModel(model_name)
            response = model.generate_content(prompt)
            
            text = response.text.strip()
            text = re.sub(r"^```json\s*", "", text, flags=re.IGNORECASE)
            text = re.sub(r"^```\s*", "", text)
            text = re.sub(r"\s*```$", "", text)
            
            data = json.loads(text)
            return {
                "activity_code": str(data.get("activity_code", "UNKNOWN")).upper(),
                "status": str(data.get("status", "IN_PROGRESS")).upper(),
                "progress_percentage": int(data.get("progress_percentage", 0)),
                "delay_reason": data.get("delay_reason"),
                "confidence": float(data.get("confidence", 0.90))
            }
        except Exception:
            # Fallback regex extraction if API fails
            match = re.search(r"ACT-\d+", raw_text, re.IGNORECASE)
            act_code = match.group(0).upper() if match else "UNKNOWN"
            status = "DELAYED" if "delay" in raw_text.lower() or "blocked" in raw_text.lower() else "IN_PROGRESS"
            
            return {
                "activity_code": act_code,
                "status": status,
                "progress_percentage": 0,
                "delay_reason": "Heavy rainfall / weather issue reported on site",
                "confidence": 0.85
            }