import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth, ROLE_DEFAULT_ROUTES } from '../context/AuthContext';
import { Search, LogOut, Menu, X } from 'lucide-react';

export default function TopNavbar({ onToggleSidebar, isSidebarOpen }) {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/projects?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const dashboardPath = ROLE_DEFAULT_ROUTES[role] || '/control-tower';

  const NAV_LINKS = [
    { label: 'Home', path: dashboardPath },
    { label: 'Dashboard', path: dashboardPath },
    { label: 'Projects', path: '/projects' },
    { label: 'Progress Updates', path: '/progress-updates' },
    { label: 'Ask Project AI', path: '/ai-assistant' },
  ];

  return (
    <nav className="bg-[#064F7C] text-white sticky top-0 z-40 shadow-sm">
      <div className="px-4 sm:px-6 flex items-center justify-between h-11">
        {/* Left: Mobile Menu Toggle + Nav Links */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-1 text-white/80 hover:text-white rounded hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link, idx) => (
              <NavLink
                key={idx}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'bg-[#0B2948] text-white font-semibold'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right: Search Bar, Role Badge, User & Logout */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden sm:flex items-center relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects, activities..."
              className="w-44 lg:w-56 h-7 pl-7 pr-2.5 text-xs bg-white/15 text-white placeholder:text-white/60 rounded border border-white/20 focus:outline-none focus:bg-white focus:text-[#25313C] focus:placeholder:text-[#89939D] transition-all"
            />
            <Search className="w-3.5 h-3.5 text-white/70 absolute left-2 pointer-events-none" />
          </form>

          {/* Neutral Government Role Badge */}
          <div className="hidden lg:flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EBF3F8] text-[#123A63] border border-[#CCE0ED]">
            {user?.roleLabel || 'Project Controller'}
          </div>

          {/* User Email */}
          <span className="hidden xl:inline text-xs text-white/80 font-normal">
            {user?.userId || 'user@projectpulse.in'}
          </span>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs text-white/90 hover:text-white hover:bg-white/15 border border-white/20 transition cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
