import LoginCard from '../components/LoginCard';
import infraBg from '../assets/infra-bg.jpg';

export default function Login() {
  return (
    <div className="relative min-h-screen w-full bg-[#F8F6F1] text-[#25313C] font-['Inter',sans-serif] flex flex-col justify-between items-center overflow-x-hidden">
      {/* Background Architectural/Infrastructure Illustration */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={infraBg}
          alt=""
          className="w-full h-full object-cover object-center opacity-30 contrast-110 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F6F1]/80 via-[#F8F6F1]/50 to-[#F8F6F1]/90" />
      </div>

      {/* Top Header Section */}
      <header className="relative z-10 pt-8 pb-4 flex flex-col items-center text-center px-4">
        <div className="flex items-center gap-3 mb-1.5">
          {/* Custom Neutral Logo */}
          <div className="w-10 h-10 rounded-md bg-[#123A63] flex items-center justify-center text-white shadow-sm">
            <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none">
              <path
                d="M 10 8 L 22 8 C 26.5 8 29 10.5 29 14.5 C 29 18.5 26.5 21 22 21 L 16 21 L 16 32 L 10 32 Z"
                fill="white"
              />
              <path
                d="M 6 21 L 12 21 L 15 15 L 18 27 L 21 17 L 23 21 L 34 21"
                stroke="#C9822B"
                strokeWidth="2.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold tracking-wider text-[#123A63] uppercase">
            PROJECT PULSE
          </h1>
        </div>

        <p className="text-xs sm:text-[13px] text-[#687582] font-medium tracking-wide">
          Intelligent Infrastructure Management Platform
        </p>

        {/* Thin Subtle Tricolour Line */}
        <div className="flex items-center gap-1 mt-2.5">
          <div className="w-8 h-0.5 rounded-full bg-[#C9822B]" />
          <div className="w-2 h-0.5 rounded-full bg-white" />
          <div className="w-8 h-0.5 rounded-full bg-[#3F7D5A]" />
        </div>
      </header>

      {/* Centered Login Card */}
      <main className="relative z-10 w-full max-w-2xl px-4 py-4 flex items-center justify-center">
        <LoginCard />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-[#687582] px-4 flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-[1px] bg-[#D9E0E6]" />
          <p className="font-semibold text-[#25313C]">© 2026 Project Pulse</p>
          <div className="w-6 h-[1px] bg-[#D9E0E6]" />
        </div>
        <p className="text-[11px] text-[#89939D]">
          Built for smarter and more transparent infrastructure management.
        </p>
      </footer>
    </div>
  );
}
