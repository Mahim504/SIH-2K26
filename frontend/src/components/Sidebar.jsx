import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Radio,
  Briefcase,
  Layers,
  Clock,
  Bot,
  HardHat,
  Send,
  PieChart,
  Users,
} from 'lucide-react';

const SIDEBAR_CONFIG = {
  controller: {
    title: 'PROJECT CONTROL',
    items: [
      { label: 'Control Tower', path: '/control-tower', icon: Radio },
      { label: 'Projects', path: '/projects', icon: Briefcase },
      { label: 'Activities', path: '/activities', icon: Layers },
      { label: 'Progress Updates', path: '/progress-updates', icon: Clock },
      { label: 'Ask Project AI', path: '/ai-assistant', icon: Bot },
    ],
  },
  field_user: {
    title: 'FIELD EXECUTION',
    items: [
      { label: 'Site Overview', path: '/site-manager', icon: HardHat },
      { label: 'My Projects', path: '/projects', icon: Briefcase },
      { label: 'Submit Progress', path: '/submit-progress', icon: Send },
      { label: 'Recent Updates', path: '/progress-updates', icon: Clock },
      { label: 'Ask Project AI', path: '/ai-assistant', icon: Bot },
    ],
  },
  authority: {
    title: 'AUTHORITY',
    items: [
      { label: 'Portfolio Overview', path: '/portfolio', icon: PieChart },
      { label: 'Projects', path: '/projects', icon: Briefcase },
      { label: 'Control Tower', path: '/control-tower', icon: Radio },
      { label: 'Progress Updates', path: '/progress-updates', icon: Clock },
      { label: 'Ask Project AI', path: '/ai-assistant', icon: Bot },
      { label: 'User Management', path: '/user-management', icon: Users },
    ],
  },
};

export default function Sidebar({ isOpen, onClose }) {
  const { role, user } = useAuth();
  const currentConfig = SIDEBAR_CONFIG[role] || SIDEBAR_CONFIG.controller;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:static top-[90px] bottom-0 left-0 w-56 lg:w-60 bg-[#F3F5F7] border-r border-[#D9E0E6] z-30 flex flex-col justify-between transition-transform duration-200 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-3">
          {/* Section Header Title */}
          <div className="px-3 py-2 text-[11px] font-bold text-[#687582] uppercase tracking-wider font-['Inter',sans-serif]">
            {currentConfig.title}
          </div>

          {/* Nav Items */}
          <div className="space-y-1 mt-1">
            {currentConfig.items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={idx}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-[5px] text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#064F7C] text-white font-semibold shadow-xs'
                        : 'text-[#25313C] hover:text-[#123A63] hover:bg-[#EAEFF4]'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Role Info Container */}
        <div className="p-3 border-t border-[#D9E0E6] bg-[#EAEFF4]/50">
          <div className="px-2 py-1.5 text-[11px] text-[#687582]">
            <span className="block text-[10px] text-[#89939D] uppercase tracking-wide">
              Authenticated Session
            </span>
            <span className="font-semibold text-[#123A63] block truncate">
              {user?.roleLabel || 'Project Controller'}
            </span>
          </div>
        </div>
      </aside>
    </>
  );
}
