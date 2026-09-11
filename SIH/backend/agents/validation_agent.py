import sqlite3

class ValidationAgent:
    def execute(self, extracted_data: dict, db_path: str = "sih.db") -> dict:
        activity_code = extracted_data.get("activity_code", "UNKNOWN")
        
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        try:
            cursor.execute("SELECT activity_name FROM schedule_activities WHERE UPPER(activity_code) = ?", (activity_code.upper(),))
            row = cursor.fetchone()
            conn.close()

            if row:
                return {"is_valid": True, "activity_name": row[0]}
            return {"is_valid": False, "activity_name": f"Unknown Activity ({activity_code})"}
        except Exception:
            if 'conn' in locals():
                conn.close()
            return {"is_valid": False, "activity_name": "Unknown Activity"}