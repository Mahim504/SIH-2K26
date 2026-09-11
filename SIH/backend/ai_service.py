import json
import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY) if GEMINI_API_KEY else None

def process_dpr_with_ai(dpr_text: str):
    prompt = f"""
    You are an expert construction management AI assistant.
    Analyze the following Daily Progress Report (DPR) text and extract structured key-value updates:
    
    DPR Text: "{dpr_text}"
    
    Return ONLY a valid JSON object with these keys:
    - "activity_code": Extracted or inferred activity code (e.g., CIV-F15-001)
    - "canonical_activity": Short description of the activity
    - "event_type": Type of event (e.g., progress, delay, issue)
    - "status": Overall status (COMPLETED, IN_PROGRESS, PARTIAL, DELAYED)
    - "progress_percent": Estimated percentage (integer 0-100)
    - "delay_reason": Reason if delayed, else null
    - "confidence_score": Float between 0.0 and 1.0
    - "requires_human_review": Boolean (true if confidence < 0.7 or status uncertain)
    """

    try:
        if client is None:
            raise RuntimeError("GEMINI_API_KEY is not set in the environment (.env file).")
    
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={
                'response_mime_type': 'application/json'
            }
        )
        return json.loads(response.text)
    except Exception as e:
        return {
            "error": str(e),
            "status": "REVIEW_REQUIRED",
            "requires_human_review": True
        }
