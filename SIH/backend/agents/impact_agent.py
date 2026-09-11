class ImpactAgent:
    def execute(self, extracted_data: dict, validation_data: dict) -> dict:
        delay_days = 0
        if extracted_data.get("status") in ["DELAYED", "BLOCKED"]:
            delay_days = 3  # Standard drift estimate

        return {
            "calculated_delay_days": delay_days,
            "is_critical_threat": delay_days > 0 and validation_data.get("is_valid", False)
        }