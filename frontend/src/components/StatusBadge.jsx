export default function StatusBadge({ status }) {
  const normalized = (status || '').toLowerCase().trim();

  let badgeClasses = 'bg-[#F0F4F8] text-[#123A63] border-[#CBD5E1]'; // default
  let dotClass = 'bg-[#123A63]';

  if (normalized === 'on track' || normalized === 'completed' || normalized === 'optimal' || normalized === 'good') {
    badgeClasses = 'bg-[#EAF4ED] text-[#3F7D5A] border-[#C8E6D3]';
    dotClass = 'bg-[#3F7D5A]';
  } else if (normalized === 'delayed' || normalized === 'high') {
    badgeClasses = 'bg-[#F8EAEA] text-[#B95050] border-[#F2C9C9]';
    dotClass = 'bg-[#B95050]';
  } else if (normalized === 'at risk' || normalized === 'medium' || normalized === 'needs review') {
    badgeClasses = 'bg-[#FAF1E4] text-[#B7791F] border-[#F3DEC3]';
    dotClass = 'bg-[#B7791F]';
  } else if (normalized === 'in progress' || normalized === 'assigned' || normalized === 'in review') {
    badgeClasses = 'bg-[#EBF3F8] text-[#064F7C] border-[#CCE0ED]';
    dotClass = 'bg-[#064F7C]';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold border ${badgeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span>{status}</span>
    </span>
  );
}
