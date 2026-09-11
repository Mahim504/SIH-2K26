from pydantic import BaseModel
from typing import List, Optional

class TaskAssignmentSchema(BaseModel):
    activity_code: str
    wbs_level: Optional[str] = None
    discipline: Optional[str] = None
    activity_name: str
    location: Optional[str] = None
    activity_description: Optional[str] = None
    planned_start: str
    planned_finish: str
    baseline_progress_before_period: float = 0.0
    target_progress_this_period: float
    planned_quantity: float
    target_quantity_this_period: float
    unit: str
    priority: Optional[str] = "MEDIUM"
    responsible_site_lead: Optional[str] = None

class DrawingSchema(BaseModel):
    type: str
    document_no: str
    revision: str
    description: str

class ResourceSchema(BaseModel):
    resource_type: str
    material_name: str
    required_count: float
    unit: str
    remarks: Optional[str] = None

class BudgetAllocationSchema(BaseModel):
    project_approved_budget: float
    budget_used_before_period: float
    budget_allocated_this_period: float
    material_budget: float
    labour_budget: float
    equipment_budget: float
    other_budget: float

class GovtExecutionPlanSchema(BaseModel):
    project_id: str
    project_name: str
    project_location: str
    department: str
    project_manager_name: str
    project_monitor: str
    assigned_site_manager: str
    reporting_cycle_id: str
    overall_project_status: str
    reporting_frequency: str
    period_from: str
    period_to: str
    submission_deadline: str
    tasks: List[TaskAssignmentSchema]
    drawings: List[DrawingSchema] = []
    planned_resources: List[ResourceSchema] = []
    budget: BudgetAllocationSchema
    known_constraints: List[str] = []
    risk_description: Optional[str] = None