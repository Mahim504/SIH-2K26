import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import {
  ChevronRight,
  Send,
} from 'lucide-react';

export default function ProgressUpdates() {
  const [sourceFilter, setSourceFilter] = useState('All');

  const updates = [
    {
      date: '10 Sep 2026',
      activity: 'Line 24 Erection (PIP-L5-024)',
      reportedBy: 'S. K. Baruah (Site Lead)',
      progress: '60%',
      status: 'Delayed',
      delayReason: 'Material Shortage',
      expectedFinish: '13 Sep 2026',
      source: 'AI Text',
    },
    {
      date: '10 Sep 2026',
      activity: 'Pump P-102 Installation (MECH-L5-011)',
      reportedBy: 'M. Sharma (Mechanical)',
      progress: '52%',
      status: 'Delayed',
      delayReason: 'Manpower Shortage',
      expectedFinish: '18 Sep 2026',
      source: 'Manual',
    },
    {
      date: '09 Sep 2026',
      activity: 'Cable Tray Installation (ELEC-L5-018)',
      reportedBy: 'D. Sen (Electrical)',
      progress: '54%',
      status: 'At Risk',
      delayReason: 'Vendor Delivery Delay',
      expectedFinish: '15 Sep 2026',
      source: 'Manual',
    },
    {
      date: '08 Sep 2026',
      activity: 'SCADA Telemetry Sensor Hookup (INST-L5-003)',
      reportedBy: 'Telemetry SCADA System',
      progress: '42%',
      status: 'On Track',
      delayReason: 'None',
      expectedFinish: '25 Sep 2026',
      source: 'Import',
    },
    {
      date: '08 Sep 2026',
      activity: 'Turbine Pedestal Grouting (CIV-L5-009)',
      reportedBy: 'R. Saikia (Civil Lead)',
      progress: '78%',
      status: 'At Risk',
      delayReason: 'Inspection Pending',
      expectedFinish: '12 Sep 2026',
      source: 'Manual',
    },
  ];

  const filteredUpdates = updates.filter(
    (u) => sourceFilter === 'All' || u.source === sourceFilter
  );

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Progress Updates</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
            Field Progress Updates
          </h1>
          <p className="text-xs text-[#687582] mt-0.5">
            Audit trail of submitted daily field logs, delay rationales, and ingestion channels.
          </p>
        </div>

        <NavLink
          to="/submit-progress"
          className="px-3.5 py-1.5 rounded-[4px] bg-[#064F7C] hover:bg-[#075985] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition self-start sm:self-auto"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Submit New Update</span>
        </NavLink>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-3 rounded-[6px] border border-[#D9E0E6] flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-2 text-xs text-[#687582]">
          <span className="font-semibold text-[#123A63]">Filter Source Channel:</span>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="h-7 bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] px-2 text-xs text-[#25313C] focus:outline-none focus:border-[#064F7C]"
          >
            <option value="All">All Ingestion Sources</option>
            <option value="Manual">Manual Field Form</option>
            <option value="AI Text">AI NLP Text Ingestion</option>
            <option value="Import">SCADA / IoT Import</option>
          </select>
        </div>

        <div className="text-xs text-[#687582]">
          Showing <strong>{filteredUpdates.length}</strong> recorded logs
        </div>
      </div>

      {/* MIS Updates Table */}
      <div className="bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Activity Description</th>
                <th>Reported By</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Delay Reason</th>
                <th>Expected Finish</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {filteredUpdates.map((u, idx) => (
                <tr key={idx}>
                  <td className="text-xs font-medium text-[#25313C] whitespace-nowrap">{u.date}</td>
                  <td>
                    <div className="font-semibold text-[#123A63]">{u.activity}</div>
                  </td>
                  <td className="text-xs text-[#687582]">{u.reportedBy}</td>
                  <td className="text-xs font-bold text-[#123A63]">{u.progress}</td>
                  <td>
                    <StatusBadge status={u.status} />
                  </td>
                  <td className="text-xs text-[#687582]">{u.delayReason}</td>
                  <td className="text-xs font-medium text-[#25313C]">{u.expectedFinish}</td>
                  <td>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-[#F3F5F7] border border-[#D9E0E6] text-[#123A63]">
                      {u.source}
                    </span>
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
