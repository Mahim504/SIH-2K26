import { NavLink } from 'react-router-dom';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import {
  PieChart,
  CheckCircle,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  ChevronRight,
  Info,
  ExternalLink,
} from 'lucide-react';

export default function Portfolio() {
  const portfolioProjects = [
    {
      name: 'Pipeline Expansion Project',
      code: 'OIL-PIPE-2026-01',
      region: 'Assam',
      status: 'At Risk',
      progress: '69%',
      priority: 'High',
      lastUpdated: '10 Sep',
    },
    {
      name: 'Eastern Corridor Railway Electrification',
      code: 'ECR-RAIL-09',
      region: 'West Bengal',
      status: 'On Track',
      progress: '72%',
      priority: 'Medium',
      lastUpdated: '10 Sep',
    },
    {
      name: 'National Highway Upgrade Phase-IV',
      code: 'NHAI-MH-44',
      region: 'Maharashtra',
      status: 'Delayed',
      progress: '48%',
      priority: 'High',
      lastUpdated: '09 Sep',
    },
    {
      name: 'Urban Infrastructure Smart Grid',
      code: 'SMRT-KA-21',
      region: 'Karnataka',
      status: 'On Track',
      progress: '81%',
      priority: 'Medium',
      lastUpdated: '09 Sep',
    },
    {
      name: 'Coastal Bulk Water Pipeline Project',
      code: 'JAL-GJ-16',
      region: 'Gujarat',
      status: 'On Track',
      progress: '89%',
      priority: 'Low',
      lastUpdated: '08 Sep',
    },
  ];

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Infrastructure Portfolio Overview</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
            Infrastructure Portfolio Overview
          </h1>
          <p className="text-xs text-[#687582] mt-0.5">
            Infrastructure-wide project monitoring and governance overview.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#D9E0E6] rounded-[5px] text-xs text-[#687582] font-medium shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-[#064F7C]" />
          <span>As on <strong>10 Sep 2026</strong></span>
        </div>
      </div>

      {/* KPI Row - All Numbers & Status Navy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Projects"
          value="42"
          subtext="Statewide infrastructure portfolio"
          icon={PieChart}
        />
        <KpiCard
          title="Projects On Track"
          value="28"
          subtext="66.7% meeting baseline timeline"
          icon={CheckCircle}
          iconColor="#3F7D5A"
        />
        <KpiCard
          title="Requiring Attention"
          value="10"
          subtext="Critical schedule or supply alerts"
          icon={AlertTriangle}
          iconColor="#C9822B"
        />
        <KpiCard
          title="Infrastructure Status"
          value="Good"
          subtext="Overall portfolio governance health"
          icon={ShieldCheck}
          iconColor="#3F7D5A"
        />
      </div>

      {/* Main Table & Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left (8 cols): Project Status Overview MIS Table */}
        <div className="lg:col-span-8 bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-4 py-3 bg-[#F2F4F6] border-b border-[#DCE2E7] flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider">
              Project Status Overview
            </h2>
            <NavLink to="/projects" className="text-xs font-semibold text-[#064F7C] hover:underline flex items-center gap-1">
              <span>View All 42 Projects</span>
              <ExternalLink className="w-3 h-3" />
            </NavLink>
          </div>

          <div className="overflow-x-auto">
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Region</th>
                  <th>Status</th>
                  <th>Progress</th>
                  <th>Priority</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {portfolioProjects.map((p) => (
                  <tr key={p.code}>
                    <td>
                      <div className="font-semibold text-[#123A63]">{p.name}</div>
                      <div className="text-[11px] text-[#89939D]">{p.code}</div>
                    </td>
                    <td className="text-xs text-[#25313C]">{p.region}</td>
                    <td>
                      <StatusBadge status={p.status} />
                    </td>
                    <td className="text-xs font-bold text-[#123A63]">{p.progress}</td>
                    <td>
                      <StatusBadge status={p.priority} />
                    </td>
                    <td className="text-xs text-[#687582]">{p.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right (4 cols): Key Insights Information Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-4 py-3 bg-[#F2F4F6] border-b border-[#DCE2E7]">
              <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider">
                Key Governance Insights
              </h2>
            </div>

            <div className="p-4 space-y-3 text-xs text-[#25313C]">
              <div className="p-3 bg-[#F8F9FA] border border-[#EAEFF4] rounded-[4px] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#064F7C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123A63]">Schedule Intervention Notice</div>
                  <p className="text-[11.5px] text-[#687582] mt-0.5">
                    2 major capital projects require high-level schedule intervention due to Right of Way (RoW) clearances.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#F8F9FA] border border-[#EAEFF4] rounded-[4px] flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123A63]">Supply Chain Variance</div>
                  <p className="text-[11.5px] text-[#687582] mt-0.5">
                    Material-related delays reported across 3 projects in Assam and Maharashtra pipeline sectors.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-[#F8F9FA] border border-[#EAEFF4] rounded-[4px] flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#064F7C] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-[#123A63]">Portfolio Variance Rate</div>
                  <p className="text-[11.5px] text-[#687582] mt-0.5">
                    Portfolio actual execution progress currently tracks 9% below baseline target for Q3 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
