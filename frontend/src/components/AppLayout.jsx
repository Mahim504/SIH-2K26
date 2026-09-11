import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import GovernmentHeader from './GovernmentHeader';
import TopNavbar from './TopNavbar';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F6F7] flex flex-col font-['Inter',sans-serif] text-[#25313C]">
      {/* Institutional Top Header */}
      <GovernmentHeader />

      {/* Government Blue Horizontal Navbar */}
      <TopNavbar
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Workspace Body: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
