import sqlite3
from db_service import get_master_schedule, get_live_updates

DB_PATH = "sih.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        project_id TEXT PRIMARY KEY,
        project_name TEXT NOT NULL,
        description TEXT,
        location TEXT,
        project_manager TEXT,
        approved_budget REAL DEFAULT 0.0,
        status TEXT DEFAULT 'ACTIVE'
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS reporting_cycles (
        cycle_id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id TEXT NOT NULL,
        cycle_type TEXT,
        period_start DATE,
        period_end DATE,
        due_date DATE,
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS schedule_activities (
        activity_id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity_code TEXT UNIQUE NOT NULL,
        activity_name TEXT NOT NULL,
        discipline TEXT,
        location TEXT,
        planned_start DATE,
        planned_finish DATE,
        unit TEXT
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS work_assignments (
        assignment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        cycle_id INTEGER NOT NULL,
        activity_code TEXT NOT NULL,
        baseline_progress REAL DEFAULT 0.0,
        target_progress REAL NOT NULL,
        planned_quantity REAL,
        unit TEXT,
        site_lead TEXT,
        instructions TEXT,
        FOREIGN KEY (cycle_id) REFERENCES reporting_cycles(cycle_id),
        FOREIGN KEY (activity_code) REFERENCES schedule_activities(activity_code)
    );
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS live_updates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        raw_text TEXT,
        activity_code TEXT,
        status TEXT,
        progress INTEGER,
        confidence REAL,
        requires_review BOOLEAN,
        delay_reason TEXT
    );
    """)

    conn.commit()
    conn.close()

def save_parsed_govt_plan(plan_data: dict):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT OR REPLACE INTO projects 
    (project_id, project_name, description, location, project_manager, approved_budget, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        plan_data.get("project_id"),
        plan_data.get("project_name"),
        f"Department: {plan_data.get('department')}",
        plan_data.get("project_location"),
        plan_data.get("project_manager_name"),
        plan_data.get("budget", {}).get("project_approved_budget", 0.0),
        plan_data.get("overall_project_status", "ACTIVE")
    ))

    cursor.execute("""
    INSERT INTO reporting_cycles 
    (project_id, cycle_type, period_start, period_end, due_date)
    VALUES (?, ?, ?, ?, ?)
    """, (
        plan_data.get("project_id"),
        plan_data.get("reporting_frequency"),
        plan_data.get("period_from"),
        plan_data.get("period_to"),
        plan_data.get("submission_deadline")
    ))
    cycle_id = cursor.lastrowid

    for task in plan_data.get("tasks", []):
        cursor.execute("""
        INSERT OR IGNORE INTO schedule_activities 
        (activity_code, activity_name, discipline, location, planned_start, planned_finish, unit)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            task.get("activity_code"),
            task.get("activity_name"),
            task.get("discipline"),
            task.get("location"),
            task.get("planned_start"),
            task.get("planned_finish"),
            task.get("unit")
        ))

        cursor.execute("""
        INSERT INTO work_assignments 
        (cycle_id, activity_code, baseline_progress, target_progress, planned_quantity, unit, site_lead, instructions)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            cycle_id,
            task.get("activity_code"),
            task.get("baseline_progress_before_period", 0.0),
            task.get("target_progress_this_period"),
            task.get("planned_quantity"),
            task.get("unit"),
            task.get("responsible_site_lead"),
            task.get("activity_description")
        ))

        cursor.execute("""
        INSERT INTO live_updates (raw_text, activity_code, status, progress, confidence, requires_review, delay_reason)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
        dpr_text,
        ai_out.get("activity_code") if isinstance(ai_out, dict) else None,
        ai_out.get("status") if isinstance(ai_out, dict) else None,
        ai_out.get("progress_percent", 0) if isinstance(ai_out, dict) else 0,
        ai_out.get("confidence_score", 0.0) if isinstance(ai_out, dict) else 0.0,
        ai_out.get("requires_human_review", False) if isinstance(ai_out, dict) else False,
        ai_out.get("delay_reason") if isinstance(ai_out, dict) else None,
        ))

    conn.commit()
    conn.close()
    return cycle_id
    def get_live_updates(limit: int = 50):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM live_updates ORDER BY id DESC LIMIT ?", (limit,))
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]
