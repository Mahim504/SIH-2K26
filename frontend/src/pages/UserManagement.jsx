import { NavLink } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import { ChevronRight, UserPlus, Shield } from 'lucide-react';

export default function UserManagement() {
  const users = [
    { name: 'Dr. A. K. Verma', email: 'a.verma@projectpulse.in', role: 'Authority / Administrator', department: 'National Infrastructure Directorate', status: 'Completed' },
    { name: 'R. K. Sharma', email: 'r.sharma@projectpulse.in', role: 'Project Controller', department: 'Project Control Wing (Assam)', status: 'Completed' },
    { name: 'S. K. Baruah', email: 's.baruah@projectpulse.in', role: 'Field User / Site Manager', department: 'Duliajan Field Office', status: 'Completed' },
    { name: 'M. Sharma', email: 'm.sharma@projectpulse.in', role: 'Field User / Site Manager', department: 'Digboi Refinery Site', status: 'Completed' },
    { name: 'D. Sen', email: 'd.sen@projectpulse.in', role: 'Field User / Site Manager', department: 'Kolkata ECR Division', status: 'Completed' },
  ];

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">User Management</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
            User & Role Management
          </h1>
          <p className="text-xs text-[#687582] mt-0.5">
            Manage authorized nodal officers, project controllers, and site engineering credentials.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('New user registration is restricted to Super Administrators.')}
          className="px-3.5 py-1.5 rounded-[4px] bg-[#064F7C] hover:bg-[#075985] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Provision Nodal Officer</span>
        </button>
      </div>

      {/* MIS Users Table */}
      <div className="bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden">
        <div className="px-4 py-3 bg-[#F2F4F6] border-b border-[#DCE2E7] flex items-center justify-between">
          <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#064F7C]" />
            <span>Authorized Personnel Directory</span>
          </h2>
          <span className="text-xs text-[#687582]">Total 5 Registered Nodal Users</span>
        </div>

        <div className="overflow-x-auto">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Officer Name</th>
                <th>Official Email</th>
                <th>Assigned Role</th>
                <th>Department / Unit</th>
                <th>Access Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx}>
                  <td className="font-semibold text-[#123A63]">{u.name}</td>
                  <td className="text-xs font-mono text-[#687582]">{u.email}</td>
                  <td className="text-xs font-medium text-[#25313C]">{u.role}</td>
                  <td className="text-xs text-[#687582]">{u.department}</td>
                  <td>
                    <StatusBadge status="On Track" />
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
