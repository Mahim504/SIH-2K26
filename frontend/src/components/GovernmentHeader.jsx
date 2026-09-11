export default function GovernmentHeader() {
  return (
    <div className="bg-white border-b border-[#D9E0E6] px-4 sm:px-8 py-2.5 flex items-center justify-between">
      {/* Left: Project Pulse Emblem & Institutional Title */}
      <div className="flex items-center gap-3">
        {/* Custom Neutral Project Pulse Logo */}
        <div className="w-9 h-9 rounded-md bg-[#123A63] flex items-center justify-center text-white shrink-0 shadow-sm">
          <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
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

        <div>
          <div className="text-[18px] font-bold text-[#123A63] tracking-wide font-['Inter',sans-serif] leading-tight">
            प्रGATI
          </div>
          <div className="text-[11px] text-[#687582] font-medium leading-none">
            Project Reality & Actual Progress Analytics for Timely Intervention
          </div>
        </div>
      </div>

      {/* Right: National Mission Tagline & Subtle Tricolour Accent */}
      <div className="hidden md:flex items-center gap-3.5 text-right">
        <div>
          <div className="text-xs font-semibold text-[#123A63] tracking-tight">
            Viksit Bharat 2047
          </div>
          <div className="text-[10.5px] text-[#89939D]">
            Stronger Infrastructure · Better Communities
          </div>
        </div>

        {/* Subtle Elegant Tricolour Ribbon Accent */}
        <div className="flex flex-col gap-0.5 h-6 w-1 rounded overflow-hidden opacity-85">
          <span className="flex-1 bg-[#C9822B]" />
          <span className="flex-1 bg-[#E2E8F0]" />
          <span className="flex-1 bg-[#3F7D5A]" />
        </div>
      </div>
    </div>
  );
}
