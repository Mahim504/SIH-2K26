import { NavLink } from 'react-router-dom';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import {
  HardHat,
  Clock,
  ListChecks,
  Activity,
  Send,
  Eye,
  Bot,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';

export default function SiteManager() {
  const currentProjects = [
    {
      name: 'Pipeline Expansion Project',
      code: 'OIL-PIPE-2026-01',
      location: 'Duliajan',
      status: 'In Progress',
      progress: '69%',
      lastUpdated: '10 Sep 2026',
    },
    {
      name: 'Refinery Upgrade Project',
      code: 'IOCL-REF-04',
      location: 'Assam',
      status: 'In Progress',
      progress: '54%',
      lastUpdated: '09 Sep 2026',
    },
    {
      name: 'Terminal Infrastructure Project',
      code: 'TERM-GHY-08',
      location: 'Guwahati',
      status: 'Delayed',
      progress: '48%',
      lastUpdated: '08 Sep 2026',
    },
    {
      name: 'Petrochemical Facility Pipeline Segment',
      code: 'PETRO-BCPL-02',
      location: 'Dibrugarh',
      status: 'On Track',
      progress: '81%',
      lastUpdated: '07 Sep 2026',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Site Manager</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
            Site Manager
          </h1>
          <p className="text-xs text-[#687582] mt-0.5">
            Manage project progress and field execution activities.
          </p>
        </div>

        {/* Action Quick Links */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/submit-progress"
            className="px-3.5 py-1.5 rounded-[4px] bg-[#064F7C] hover:bg-[#075985] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Progress</span>
          </NavLink>
        </div>
      </div>

      {/* KPI Row - All Numbers Navy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Active Projects"
          value="5"
          subtext="Assigned field jurisdictions"
          icon={HardHat}
        />
        <KpiCard
          title="Today's Updates"
          value="8"
          subtext="Field logs synchronized"
          icon={Clock}
        />
        <KpiCard
          title="Pending Tasks"
          value="12"
          subtext="Inspection & quality sign-offs"
          icon={ListChecks}
          iconColor="#B7791F"
        />
        <KpiCard
          title="Recent Activity"
          value="6"
          subtext="Field updates in past 24h"
          icon={Activity}
        />
      </div>

      {/* Government MIS Table: My Current Projects */}
      <div className="bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-4 py-3 bg-[#F2F4F6] border-b border-[#DCE2E7] flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider">
            My Current Projects
          </h2>
          <span className="text-xs text-[#687582]">Showing 4 Active Allocations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Location</th>
                <th>Status</th>
                <th>Progress</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((proj) => (
                <tr key={proj.code}>
                  <td>
                    <div className="font-semibold text-[#123A63]">{proj.name}</div>
                    <div className="text-[11px] text-[#89939D]">Code: {proj.code}</div>
                  </td>
                  <td className="text-xs text-[#25313C]">{proj.location}</td>
                  <td>
                    <StatusBadge status={proj.status} />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#123A63]">{proj.progress}</span>
                      <div className="w-20 bg-[#D9E0E6] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#064F7C] h-full rounded-full"
                          style={{ width: proj.progress }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="text-xs text-[#687582]">{proj.lastUpdated}</td>
                  <td>
                    <NavLink
                      to={`/activities?project=${encodeURIComponent(proj.code)}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#064F7C] hover:underline"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Open Project</span>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Field Actions Section */}
      <div className="bg-white p-5 rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider mb-3">
          Field Execution Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <NavLink
            to="/submit-progress"
            className="p-3 bg-[#F8F9FA] hover:bg-[#EBF3F8] border border-[#D9E0E6] hover:border-[#064F7C] rounded-[4px] flex items-center gap-2.5 transition text-left"
          >
            <Send className="w-4 h-4 text-[#064F7C] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#123A63]">Submit Progress</div>
              <div className="text-[10.5px] text-[#687582]">Log daily field output</div>
            </div>
          </NavLink>

          <NavLink
            to="/progress-updates"
            className="p-3 bg-[#F8F9FA] hover:bg-[#EBF3F8] border border-[#D9E0E6] hover:border-[#064F7C] rounded-[4px] flex items-center gap-2.5 transition text-left"
          >
            <Eye className="w-4 h-4 text-[#064F7C] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#123A63]">Recent Updates</div>
              <div className="text-[10.5px] text-[#687582]">Review submitted records</div>
            </div>
          </NavLink>

          <NavLink
            to="/activities"
            className="p-3 bg-[#F8F9FA] hover:bg-[#EBF3F8] border border-[#D9E0E6] hover:border-[#064F7C] rounded-[4px] flex items-center gap-2.5 transition text-left"
          >
            <FolderOpen className="w-4 h-4 text-[#064F7C] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#123A63]">Open Activity Log</div>
              <div className="text-[10.5px] text-[#687582]">View milestone breakdowns</div>
            </div>
          </NavLink>

          <NavLink
            to="/ai-assistant"
            className="p-3 bg-[#F8F9FA] hover:bg-[#EBF3F8] border border-[#D9E0E6] hover:border-[#064F7C] rounded-[4px] flex items-center gap-2.5 transition text-left"
          >
            <Bot className="w-4 h-4 text-[#064F7C] shrink-0" />
            <div>
              <div className="text-xs font-bold text-[#123A63]">Ask Project AI</div>
              <div className="text-[10.5px] text-[#687582]">Field intelligence assistant</div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
