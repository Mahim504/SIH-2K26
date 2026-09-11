import os
from io import BytesIO
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.services.pdf_parser import GovtPDFParser
from backend.db_service import init_db, save_parsed_govt_plan, get_db_connection

app = FastAPI(title="Project Pulse Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

parser = GovtPDFParser()

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/")
def root():
    return {"status": "Project Pulse Backend Active"}

@app.post("/api/govt/upload-assignment-pdf")
async def upload_assignment_pdf(file: UploadFile = File(...)):
    allowed_extensions = [".pdf", ".txt"]
    file_ext = os.path.splitext(file.filename)[1].lower()

    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400, 
            detail=f"File extension '{file_ext}' not supported. Allowed extensions: {allowed_extensions}"
        )

    try:
        contents = await file.read()
        parsed_data = parser.parse_pdf_to_json(BytesIO(contents), file_ext=file_ext)
        cycle_id = save_parsed_govt_plan(parsed_data)

        return {
            "status": "SUCCESS",
            "message": "Document Parsed & Saved to Database Successfully",
            "cycle_id": cycle_id,
            "data": parsed_data
        }
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Processing Error: {str(e)}")

@app.get("/api/govt/project-assignments/{project_id}")
def get_project_assignments(project_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM projects WHERE project_id = ?", (project_id,))
    project = cursor.fetchone()

    if not project:
        conn.close()
        raise HTTPException(status_code=404, detail="Project not found")

    cursor.execute("""
        SELECT wa.*, sa.activity_name, sa.discipline, sa.planned_start, sa.planned_finish 
        FROM work_assignments wa
        JOIN reporting_cycles rc ON wa.cycle_id = rc.cycle_id
        JOIN schedule_activities sa ON wa.activity_code = sa.activity_code
        WHERE rc.project_id = ?
    """, (project_id,))
    
    assignments = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return {
        "project": dict(project),
        "assigned_tasks": assignments
    }