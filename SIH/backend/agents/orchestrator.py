from backend.agents.parsing_agent import ParsingAgent
from backend.agents.validation_agent import ValidationAgent
from backend.agents.impact_agent import ImpactAgent
from backend.agents.alert_agent import AlertAgent
import sqlite3

class AgenticOrchestrator:
    def __init__(self):
        self.parser = ParsingAgent()
        self.validator = ValidationAgent()
        self.impact = ImpactAgent()
        self.alerter = AlertAgent()

    def init_and_seed_db(self, db_path: str = "sih.db"):
        """Auto-repairs DB schema & inserts sample activity codes."""
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()

        # 1. Ensure schedule_activities table exists
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS schedule_activities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            activity_code TEXT UNIQUE,
            activity_name TEXT
        )
        """)

        # 2. Seed default codes
        sample_activities = [
            ('ACT-101', 'Pillar Foundation Excavation'),
            ('ACT-102', 'Reinforcement Steel Binding'),
            ('ACT-103', 'Concrete Pouring & Curing')
        ]
        for code, name in sample_activities:
            cursor.execute("""
            INSERT OR IGNORE INTO schedule_activities (activity_code, activity_name)
            VALUES (?, ?)
            """, (code, name))

        # 3. Ensure live_updates table exists
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS live_updates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            raw_text TEXT,
            activity_code TEXT,
            status TEXT,
            progress INTEGER,
            delay_reason TEXT,
            confidence REAL,
            requires_review INTEGER,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
        """)

        conn.commit()
        conn.close()

    def run_pipeline(self, raw_text: str, db_path: str = "sih.db") -> dict:
        # Guarantee DB Schema
        self.init_and_seed_db(db_path)

        # Step 1: Parse
        parsed = self.parser.execute(raw_text)

        # Step 2: Validate
        validated = self.validator.execute(parsed, db_path)

        # Step 3: Impact Analysis
        impact_res = self.impact.execute(parsed, validated)

        # Step 4: Alert Level
        alert_res = self.alerter.execute(parsed, impact_res)

        # Step 5: Save Record
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO live_updates 
            (raw_text, activity_code, status, progress, delay_reason, confidence, requires_review)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            raw_text,
            parsed.get("activity_code"),
            parsed.get("status"),
            parsed.get("progress_percentage"),
            parsed.get("delay_reason"),
            parsed.get("confidence"),
            1 if alert_res.get("requires_human_review") else 0
        ))
        conn.commit()
        conn.close()

        return {
            "parsed": parsed,
            "validation": validated,
            "impact": impact_res,
            "alerts": alert_res,
            "status": "Pipeline Processed & Saved to sih.db Successfully!"
        }