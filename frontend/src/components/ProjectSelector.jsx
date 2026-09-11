import { Calendar, ChevronDown } from 'lucide-react';

export default function ProjectSelector({ selectedProject = 'Pipeline Expansion Project', onSelect }) {
  const projects = [
    'Pipeline Expansion Project (OIL-PIPE-2026-01)',
    'Refinery Modernization Project (IOCL-REF-04)',
    'National Highway Corridor Phase-II (NHAI-2026-88)',
    'Urban Metro Transit Section 4 (METRO-AS-12)',
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Project Selector Dropdown */}
      <div className="relative inline-block">
        <select
          aria-label="Select Infrastructure Project"
          defaultValue={selectedProject}
          onChange={(e) => onSelect && onSelect(e.target.value)}
          className="appearance-none bg-white border border-[#D9E0E6] rounded-[5px] pl-3 pr-8 py-1.5 text-xs font-semibold text-[#123A63] focus:outline-none focus:border-[#064F7C] shadow-2xs cursor-pointer"
        >
          {projects.map((proj, idx) => (
            <option key={idx} value={proj}>
              {proj}
            </option>
          ))}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-[#687582] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>

      {/* As On Date Pill */}
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#D9E0E6] rounded-[5px] text-xs text-[#687582] font-medium shadow-2xs">
        <Calendar className="w-3.5 h-3.5 text-[#064F7C]" />
        <span>As on <strong>10 Sep 2026</strong></span>
      </div>
    </div>
  );
}
