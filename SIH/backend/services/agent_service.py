import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def run_comparison_agent(planned_data: dict, actual_data: dict) -> dict:
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        genai.configure(api_key=api_key)

    planned_target = float(planned_data.get("target_progress", 100.0))
    actual_done = float(actual_data.get("actual_progress_percent", 0.0))
    
    variance_gap = planned_target - actual_done
    
    if variance_gap <= 0:
        status = "COMPLETED"
    elif variance_gap <= 10:
        status = "ON_TRACK"
    elif variance_gap <= 30:
        status = "MINOR_DELAY"
    else:
        status = "CRITICAL_DELAY"

    prompt = f"""
    Act as an Expert Infrastructure Auditor for Higher Government Authority.
    Compare Planned Target vs Actual Site Report:

    PLANNED (Table 1 Baseline):
    - Activity Code: {planned_data.get('activity_code')}
    - Target Progress: {planned_target}%
    - Target Quantity: {planned_data.get('planned_quantity')} {planned_data.get('unit')}

    ACTUAL (Table 2 Site Input):
    - Achieved Progress: {actual_done}%
    - Completed Quantity: {actual_data.get('actual_quantity_done')} {planned_data.get('unit')}
    - Site Delay Reason: {actual_data.get('delay_reason')}
    - Site Lead Comment: {actual_data.get('site_comment')}

    Provide exactly 2 concise actionable steps for the Higher Authority to issue instructions to resolve this delay. Maximum 50 words.
    """

    try:
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        response = model.generate_content(prompt)
        ai_recommendation = response.text.strip()
    except Exception:
        ai_recommendation = f"Variance gap of {variance_gap}% detected. Direct site lead to expedite operations and address reported bottlenecks."

    return {
        "planned_target": planned_target,
        "variance_gap": variance_gap,
        "status": status,
        "ai_recommendation": ai_recommendation
    }