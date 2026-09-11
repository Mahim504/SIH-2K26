import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProjectSelector from '../components/ProjectSelector';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import {
  TrendingUp,
  Activity,
  AlertTriangle,
  Clock,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export default function ControlTower() {
  const [selectedProject, setSelectedProject] = useState('Pipeline Expansion Project (OIL-PIPE-2026-01)');

  const activitiesRequiringAttention = [
    {
      code: 'PIP-L5-024',
      name: 'Line 24 Erection',
      discipline: 'Piping',
      planned: '100%',
      actual: '60%',
      variance: '-40%',
      status: 'Delayed',
      reason: 'Material Shortage',
      expectedFinish: '13 Sep 2026',
    },
    {
      code: 'MECH-L5-011',
      name: 'Pump P-102 Installation',
      discipline: 'Mechanical',
      planned: '75%',
      actual: '52%',
      variance: '-23%',
      status: 'Delayed',
      reason: 'Manpower Shortage',
      expectedFinish: '18 Sep 2026',
    },
    {
      code: 'ELEC-L5-018',
      name: 'Cable Tray Installation',
      discipline: 'Electrical',
      planned: '66%',
      actual: '54%',
      variance: '-12%',
      status: 'At Risk',
      reason: 'Vendor Delivery Delay',
      expectedFinish: '15 Sep 2026',
    },
    {
      code: 'CIV-L5-009',
      name: 'Turbine Pedestal Grouting',
      discipline: 'Civil',
      planned: '90%',
      actual: '78%',
      variance: '-12%',
      status: 'At Risk',
      reason: 'Curing Inspection Pending',
      expectedFinish: '12 Sep 2026',
    },
  ];

  const recentSiteUpdates = [
    { title: 'Line 24 Erection updated to 60%', time: '2 hours ago', by: 'S. K. Baruah (Site Lead)' },
    { title: 'Pump P-102 installation started', time: '5 hours ago', by: 'M. Sharma (Mechanical)' },
    { title: 'Cable tray progress updated to 54%', time: 'Yesterday', by: 'D. Sen (Electrical)' },
    { title: 'Excavation complete for Segment B', time: '08 Sep 2026', by: 'R. Saikia (Civil)' },
  ];

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Project Control Tower</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
            Project Control Tower
          </h1>
          <p className="text-xs text-[#687582] mt-0.5">
            Monitor planned versus actual execution progress and project risks.
          </p>
        </div>

        <ProjectSelector
          selectedProject={selectedProject}
          onSelect={setSelectedProject}
        />
      </div>

      {/* KPI Row - All KPI Numbers Navy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Planned Progress"
          value="78%"
          subtext="Baseline completion as of today"
          icon={TrendingUp}
        />
        <KpiCard
          title="Actual Progress"
          value="69%"
          subtext="Reported execution progress"
          icon={Activity}
        />
        <KpiCard
          title="Variance"
          value="-9%"
          subtext="Actual versus baseline"
          icon={AlertTriangle}
          iconColor="#B95050"
        />
        <KpiCard
          title="Delayed Activities"
          value="6"
          subtext="Require project attention"
          icon={Clock}
          iconColor="#C9822B"
        />
      </div>

      {/* Main Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left 2 Cols: Activities Requiring Attention MIS Table */}
        <div className="lg:col-span-2 bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-4 py-3 bg-[#F2F4F6] border-b border-[#DCE2E7] flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider">
              Activities Requiring Attention
            </h2>
            <NavLink
              to="/activities"
              className="text-xs font-semibold text-[#064F7C] hover:underline flex items-center gap-1"
            >
              <span>View All Activities</span>
              <ExternalLink className="w-3 h-3" />
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Activity & Code</th>
                  <th>Planned</th>
                  <th>Actual</th>
                  <th>Variance</th>
                  <th>Status</th>
                  <th>Delay Reason</th>
                  <th>Exp. Finish</th>
                </tr>
              </thead>
              <tbody>
                {activitiesRequiringAttention.map((act) => (
                  <tr key={act.code}>
                    <td>
                      <div className="font-semibold text-[#123A63]">{act.name}</div>
                      <div className="text-[11px] text-[#89939D]">{act.code} · {act.discipline}</div>
                    </td>
                    <td className="font-medium text-[#25313C]">{act.planned}</td>
                    <td className="font-medium text-[#25313C]">{act.actual}</td>
                    <td className="font-semibold text-[#123A63]">{act.variance}</td>
                    <td>
                      <StatusBadge status={act.status} />
                    </td>
                    <td className="text-[12px] text-[#687582]">{act.reason}</td>
                    <td className="text-[12px] text-[#25313C] font-medium">{act.expectedFinish}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Recent Site Updates & Quick Actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-4 py-3 bg-[#F2F4F6] border-b border-[#DCE2E7] flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider">
                Recent Site Updates
              </h2>
              <NavLink to="/progress-updates" className="text-xs text-[#064F7C] hover:underline">
                History
              </NavLink>
            </div>

            <div className="p-3 space-y-2.5">
              {recentSiteUpdates.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-[4px] bg-[#F8F9FA] border border-[#EAEFF4] text-xs"
                >
                  <div className="font-semibold text-[#123A63] leading-snug">{item.title}</div>
                  <div className="flex items-center justify-between text-[11px] text-[#89939D] mt-1">
                    <span>{item.by}</span>
                    <span className="font-medium text-[#687582]">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Schedule Notice */}
          <div className="bg-[#FAF1E4] border border-[#F3DEC3] rounded-[6px] p-3.5 text-xs text-[#25313C]">
            <div className="font-bold text-[#123A63] flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-[#B7791F]" />
              <span>Critical Path Alert</span>
            </div>
            <p className="text-[11.5px] text-[#687582] leading-relaxed">
              Line 24 Erection holds an 8-day projected delay impacting the mechanical commission phase. Action required from procurement wing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
