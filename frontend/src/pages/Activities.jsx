import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProjectSelector from '../components/ProjectSelector';
import StatusBadge from '../components/StatusBadge';
import {
  ChevronRight,
  Filter,
} from 'lucide-react';

export default function Activities() {
  const [selectedProject, setSelectedProject] = useState('Pipeline Expansion Project (OIL-PIPE-2026-01)');
  const [disciplineFilter, setDisciplineFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const allActivities = [
    {
      code: 'PIP-L5-024',
      name: 'Line 24 Erection',
      discipline: 'Piping',
      wbs: 'WBS 3.2.1',
      planned: '100%',
      actual: '60%',
      variance: '-40%',
      status: 'Delayed',
      expectedFinish: '13 Sep 2026',
    },
    {
      code: 'MECH-L5-011',
      name: 'Pump P-102 Installation',
      discipline: 'Mechanical',
      wbs: 'WBS 3.4.2',
      planned: '75%',
      actual: '52%',
      variance: '-23%',
      status: 'Delayed',
      expectedFinish: '18 Sep 2026',
    },
    {
      code: 'ELEC-L5-018',
      name: 'Cable Tray Installation',
      discipline: 'Electrical',
      wbs: 'WBS 4.1.3',
      planned: '66%',
      actual: '54%',
      variance: '-12%',
      status: 'At Risk',
      expectedFinish: '15 Sep 2026',
    },
    {
      code: 'CIV-L5-009',
      name: 'Turbine Pedestal Grouting',
      discipline: 'Civil',
      wbs: 'WBS 2.1.4',
      planned: '90%',
      actual: '78%',
      variance: '-12%',
      status: 'At Risk',
      expectedFinish: '12 Sep 2026',
    },
    {
      code: 'INST-L5-003',
      name: 'SCADA Telemetry Pressure Sensor Hookup',
      discipline: 'Instrumentation',
      wbs: 'WBS 5.2.1',
      planned: '40%',
      actual: '42%',
      variance: '+2%',
      status: 'On Track',
      expectedFinish: '25 Sep 2026',
    },
    {
      code: 'CIV-L5-001',
      name: 'Substation Foundation Excavation',
      discipline: 'Civil',
      wbs: 'WBS 1.1.1',
      planned: '100%',
      actual: '100%',
      variance: '0%',
      status: 'Completed',
      expectedFinish: '28 Aug 2026',
    },
  ];

  const filteredActivities = allActivities.filter((act) => {
    const matchesDiscipline = disciplineFilter === 'All' || act.discipline === disciplineFilter;
    const matchesStatus = statusFilter === 'All' || act.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesDiscipline && matchesStatus;
  });

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Project Activities</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
            Project Activities
          </h1>
          <p className="text-xs text-[#687582] mt-0.5">
            WBS-level activity tracking, discipline progress, and schedule variance analysis.
          </p>
        </div>

        <ProjectSelector
          selectedProject={selectedProject}
          onSelect={setSelectedProject}
        />
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-3.5 rounded-[6px] border border-[#D9E0E6] flex flex-wrap items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#687582]">
          <div className="flex items-center gap-1.5 font-semibold text-[#123A63]">
            <Filter className="w-3.5 h-3.5 text-[#064F7C]" />
            <span>Filters:</span>
          </div>

          <div>
            <label className="mr-1.5 text-[11px] font-medium text-[#687582]">Discipline:</label>
            <select
              value={disciplineFilter}
              onChange={(e) => setDisciplineFilter(e.target.value)}
              className="h-7 bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] px-2 text-xs text-[#25313C] focus:outline-none focus:border-[#064F7C]"
            >
              <option value="All">All Disciplines</option>
              <option value="Piping">Piping</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Electrical">Electrical</option>
              <option value="Civil">Civil</option>
              <option value="Instrumentation">Instrumentation</option>
            </select>
          </div>

          <div>
            <label className="mr-1.5 text-[11px] font-medium text-[#687582]">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-7 bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] px-2 text-xs text-[#25313C] focus:outline-none focus:border-[#064F7C]"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-[#687582]">
          Showing <strong>{filteredActivities.length}</strong> of <strong>{allActivities.length}</strong> activities
        </div>
      </div>

      {/* MIS Activities Table */}
      <div className="bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Activity Code</th>
                <th>Activity Name</th>
                <th>Discipline</th>
                <th>WBS Level</th>
                <th>Planned %</th>
                <th>Actual %</th>
                <th>Variance</th>
                <th>Status</th>
                <th>Expected Finish</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((act) => (
                <tr key={act.code}>
                  <td className="font-mono text-xs font-semibold text-[#123A63]">{act.code}</td>
                  <td className="font-semibold text-[#123A63]">{act.name}</td>
                  <td className="text-xs text-[#25313C]">{act.discipline}</td>
                  <td className="text-xs font-mono text-[#687582]">{act.wbs}</td>
                  <td className="text-xs font-medium text-[#25313C]">{act.planned}</td>
                  <td className="text-xs font-medium text-[#25313C]">{act.actual}</td>
                  <td className="text-xs font-bold text-[#123A63]">{act.variance}</td>
                  <td>
                    <StatusBadge status={act.status} />
                  </td>
                  <td className="text-xs text-[#25313C] font-medium">{act.expectedFinish}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
