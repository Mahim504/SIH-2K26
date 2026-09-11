import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import {
  ChevronRight,
  Search,
  Plus,
  Filter,
  FolderOpen,
} from 'lucide-react';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');

  const allProjects = [
    {
      code: 'OIL-PIPE-2026-01',
      name: 'Pipeline Expansion Project',
      location: 'Duliajan, Assam',
      region: 'Assam',
      plannedStart: '01 Jan 2026',
      plannedFinish: '30 Dec 2026',
      progress: '69%',
      status: 'At Risk',
      lastUpdated: '10 Sep 2026',
    },
    {
      code: 'IOCL-REF-04',
      name: 'Refinery Modernization Project',
      location: 'Digboi, Assam',
      region: 'Assam',
      plannedStart: '15 Feb 2026',
      plannedFinish: '15 Nov 2026',
      progress: '54%',
      status: 'In Progress',
      lastUpdated: '09 Sep 2026',
    },
    {
      code: 'NHAI-MH-44',
      name: 'National Highway Corridor Phase-IV',
      location: 'Nagpur, Maharashtra',
      region: 'Maharashtra',
      plannedStart: '10 Mar 2026',
      plannedFinish: '20 Oct 2026',
      progress: '48%',
      status: 'Delayed',
      lastUpdated: '09 Sep 2026',
    },
    {
      code: 'ECR-RAIL-09',
      name: 'Eastern Corridor Railway Electrification',
      location: 'Kolkata, West Bengal',
      region: 'West Bengal',
      plannedStart: '01 Feb 2026',
      plannedFinish: '31 Jan 2027',
      progress: '72%',
      status: 'On Track',
      lastUpdated: '10 Sep 2026',
    },
    {
      code: 'SMRT-KA-21',
      name: 'Urban Infrastructure Smart Grid',
      location: 'Bengaluru, Karnataka',
      region: 'Karnataka',
      plannedStart: '05 Jan 2026',
      plannedFinish: '15 Dec 2026',
      progress: '81%',
      status: 'On Track',
      lastUpdated: '09 Sep 2026',
    },
    {
      code: 'JAL-GJ-16',
      name: 'Coastal Bulk Water Pipeline Project',
      location: 'Kandla, Gujarat',
      region: 'Gujarat',
      plannedStart: '15 Jan 2026',
      plannedFinish: '28 Feb 2027',
      progress: '89%',
      status: 'On Track',
      lastUpdated: '08 Sep 2026',
    },
  ];

  const filteredProjects = allProjects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesRegion = regionFilter === 'All' || p.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Projects</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
            Infrastructure Projects
          </h1>
          <p className="text-xs text-[#687582] mt-0.5">
            View and manage statewide infrastructure projects and execution schedules.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Project onboarding wizard is accessible to Nodal Project Administrators.')}
          className="px-3.5 py-1.5 rounded-[4px] bg-[#064F7C] hover:bg-[#075985] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Project</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3.5 rounded-[6px] border border-[#D9E0E6] flex flex-wrap items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search code, name, location..."
              className="w-52 sm:w-64 h-8 pl-8 pr-3 text-xs bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] text-[#25313C] focus:outline-none focus:border-[#064F7C]"
            />
            <Search className="w-3.5 h-3.5 text-[#89939D] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs text-[#687582]">
            <Filter className="w-3.5 h-3.5 text-[#687582]" />
            <select
              aria-label="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] px-2.5 text-xs text-[#25313C] focus:outline-none focus:border-[#064F7C]"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="In Progress">In Progress</option>
              <option value="At Risk">At Risk</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>

          {/* Region Filter */}
          <select
            aria-label="Filter by Region"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="h-8 bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] px-2.5 text-xs text-[#25313C] focus:outline-none focus:border-[#064F7C]"
          >
            <option value="All">All Regions</option>
            <option value="Assam">Assam</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Gujarat">Gujarat</option>
          </select>
        </div>

        <div className="text-xs text-[#687582]">
          Showing <strong>{filteredProjects.length}</strong> of <strong>{allProjects.length}</strong> projects
        </div>
      </div>

      {/* MIS Table */}
      <div className="bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project Code</th>
                <th>Project Name</th>
                <th>Location</th>
                <th>Planned Start</th>
                <th>Planned Finish</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((p) => (
                <tr key={p.code}>
                  <td className="font-mono text-xs font-semibold text-[#123A63]">{p.code}</td>
                  <td className="font-semibold text-[#123A63]">{p.name}</td>
                  <td className="text-xs text-[#25313C]">{p.location}</td>
                  <td className="text-xs text-[#687582]">{p.plannedStart}</td>
                  <td className="text-xs text-[#687582]">{p.plannedFinish}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#123A63]">{p.progress}</span>
                      <div className="w-16 bg-[#D9E0E6] h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#064F7C] h-full rounded-full" style={{ width: p.progress }} />
                      </div>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="text-xs text-[#687582]">{p.lastUpdated}</td>
                  <td>
                    <NavLink
                      to={`/activities?project=${encodeURIComponent(p.code)}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#064F7C] hover:underline"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Activities</span>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
