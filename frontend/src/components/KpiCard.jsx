export default function KpiCard({ title, value, subtext, icon: Icon, iconColor = '#123A63' }) {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-[6px] border border-[#DDE3E8] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#687582] uppercase tracking-wider">
          {title}
        </span>
        {Icon && (
          <div className="w-7 h-7 rounded bg-[#F3F5F7] flex items-center justify-center text-[#123A63]">
            <Icon className="w-4 h-4" style={{ color: iconColor }} strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="mt-2.5 mb-1">
        <div className="text-[26px] sm:text-[28px] font-bold text-[#123A63] tracking-tight leading-none font-['Inter',sans-serif]">
          {value}
        </div>
      </div>

      {subtext && (
        <div className="text-[11.5px] text-[#89939D] mt-1 flex items-center gap-1.5">
          <span>{subtext}</span>
        </div>
      )}
    </div>
  );
}
