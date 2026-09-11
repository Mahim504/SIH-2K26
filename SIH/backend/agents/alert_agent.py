class AlertAgent:
    def execute(self, extracted_data: dict, impact_data: dict) -> dict:
        escalation_level = "NONE"
        
        if impact_data.get("is_critical_threat"):
            escalation_level = "GOVT_ALERT"
        elif impact_data.get("calculated_delay_days", 0) > 0:
            escalation_level = "SITE_LEVEL"

        requires_review = extracted_data.get("confidence", 1.0) < 0.70

        return {
            "escalation_level": escalation_level,
            "requires_human_review": requires_review
        }