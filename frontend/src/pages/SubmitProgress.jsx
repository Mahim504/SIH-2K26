import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import StatusBadge from '../components/StatusBadge';
import {
  ChevronRight,
  Send,
  Save,
  Sparkles,
  CheckCircle2,
  Edit3,
  Loader2,
} from 'lucide-react';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export default function SubmitProgress() {
  const [formData, setFormData] = useState({
    project: 'Pipeline Expansion Project (OIL-PIPE-2026-01)',
    activity: 'Line 24 Erection (PIP-L5-024)',
    reportDate: '2026-09-10',
    progress: '60',
    status: 'Delayed',
    delayReason: 'Material Shortage',
    expectedFinish: '2026-09-13',
    remarks: '24-inch diameter carbon steel pipes delivery awaiting customs clearance.',
  });

  const [nlText, setNlText] = useState(
    'Line 24 erection has reached 60%. Remaining work could not continue because the 24-inch pipes have not arrived. Expected completion is 13 September.'
  );

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedData, setAnalyzedData] = useState(null);
  const [submittedMessage, setSubmittedMessage] = useState(null);

    const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/process-dpr-agentic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw_text: nlText }),
      });
      if (!res.ok) throw new Error(`Backend error: ${res.status}`);
      const data = await res.json();
      const ai = data.ai_extraction || {};

      setAnalyzedData({
        activity: ai.canonical_activity || ai.activity_code || 'Unrecognized activity',
        progress: `${ai.progress_percent ?? 0}%`,
        status: ai.status || 'REVIEW_REQUIRED',
        delayReason: ai.delay_reason || 'None / On Schedule',
        expectedFinish: formData.expectedFinish,
        remarks: ai.error ? `AI error: ${ai.error}` : nlText,
      });
    } catch (err) {
      setSubmittedMessage(`Could not reach AI backend: ${err.message}`);
      setTimeout(() => setSubmittedMessage(null), 4000);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedMessage('Progress update recorded and synchronized with Project Control Tower.');
    setTimeout(() => setSubmittedMessage(null), 4000);
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <NavLink to="/site-manager" className="hover:text-[#123A63] hover:underline">Field Execution</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Submit Progress</span>
      </nav>

      {/* Header */}
      <div className="pb-3 border-b border-[#D9E0E6]">
        <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
          Submit Progress Update
        </h1>
        <p className="text-xs text-[#687582] mt-0.5">
          Record daily execution milestones and log delay root-causes for baseline synchronisation.
        </p>
      </div>

      {submittedMessage && (
        <div className="p-3 bg-[#EAF4ED] border border-[#C8E6D3] rounded-[4px] text-xs text-[#3F7D5A] font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-[#3F7D5A]" />
          <span>{submittedMessage}</span>
        </div>
      )}

      {/* Two Column Layout: Structured Form & Natural Language AI Parser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col (7 cols): Structured Progress Form */}
        <div className="lg:col-span-7 bg-white p-5 rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
          <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider mb-4 pb-2 border-b border-[#EAEFF4]">
            Structured Progress Entry Form
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-[#25313C] mb-1">
                Project Name & Code
              </label>
              <select
                value={formData.project}
                onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                className="w-full text-xs bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
              >
                <option>Pipeline Expansion Project (OIL-PIPE-2026-01)</option>
                <option>Refinery Modernization Project (IOCL-REF-04)</option>
                <option>National Highway Corridor Phase-II (NHAI-2026-88)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#25313C] mb-1">
                  Activity Code & Description
                </label>
                <select
                  value={formData.activity}
                  onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                  className="w-full text-xs bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
                >
                  <option>Line 24 Erection (PIP-L5-024)</option>
                  <option>Pump P-102 Installation (MECH-L5-011)</option>
                  <option>Cable Tray Installation (ELEC-L5-018)</option>
                  <option>Turbine Pedestal Grouting (CIV-L5-009)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#25313C] mb-1">
                  Report Date
                </label>
                <input
                  type="date"
                  value={formData.reportDate}
                  onChange={(e) => setFormData({ ...formData, reportDate: e.target.value })}
                  className="w-full text-xs bg-white border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#25313C] mb-1">
                  Today's Cumulative Progress (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                  className="w-full text-xs bg-white border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#25313C] mb-1">
                  Execution Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full text-xs bg-white border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
                >
                  <option value="On Track">On Track</option>
                  <option value="Delayed">Delayed</option>
                  <option value="At Risk">At Risk</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#25313C] mb-1">
                  Delay Reason (if applicable)
                </label>
                <select
                  value={formData.delayReason}
                  onChange={(e) => setFormData({ ...formData, delayReason: e.target.value })}
                  className="w-full text-xs bg-white border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
                >
                  <option>Material Shortage</option>
                  <option>Manpower Shortage</option>
                  <option>Equipment Breakdown</option>
                  <option>Weather Disruption</option>
                  <option>Design Revision / Approval</option>
                  <option>None / On Schedule</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#25313C] mb-1">
                  Projected Finish Date
                </label>
                <input
                  type="date"
                  value={formData.expectedFinish}
                  onChange={(e) => setFormData({ ...formData, expectedFinish: e.target.value })}
                  className="w-full text-xs bg-white border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#25313C] mb-1">
                Field Remarks & Observations
              </label>
              <textarea
                rows={3}
                value={formData.remarks}
                onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                className="w-full text-xs bg-white border border-[#D9E0E6] rounded-[4px] px-3 py-2 text-[#25313C] focus:outline-none focus:border-[#064F7C]"
              />
            </div>

            {/* Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-[#064F7C] hover:bg-[#075985] text-white text-xs font-semibold rounded-[4px] flex items-center gap-1.5 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Update</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSubmittedMessage('Draft saved to local site memory.');
                  setTimeout(() => setSubmittedMessage(null), 3000);
                }}
                className="px-4 py-2 bg-white hover:bg-[#F8FAFC] text-[#064F7C] border border-[#064F7C] text-xs font-semibold rounded-[4px] flex items-center gap-1.5 transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Col (5 cols): Natural Language Update & Mock AI Parser */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-5 rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C9822B]" />
                <span>Describe Site Update (NLP)</span>
              </h2>
            </div>
            <p className="text-[11.5px] text-[#687582] mb-3">
              Type or paste free-form site updates. The system extracts milestone percentages, delay roots, and finish dates.
            </p>

            <textarea
              rows={4}
              value={nlText}
              onChange={(e) => setNlText(e.target.value)}
              placeholder="e.g. Line 24 erection has reached 60%. Remaining work could not continue because the 24-inch pipes have not arrived. Expected completion is 13 September."
              className="w-full text-xs p-3 bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] text-[#25313C] focus:outline-none focus:border-[#064F7C] leading-relaxed"
            />

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !nlText.trim()}
              className="mt-2.5 w-full py-2 bg-[#123A63] hover:bg-[#0B2948] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-60"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing Text...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Analyze Update</span>
                </>
              )}
            </button>
          </div>

          {/* AI Interpretation Card */}
          {analyzedData && (
            <div className="bg-white p-4 rounded-[6px] border border-[#CCE0ED] shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#EAEFF4]">
                <span className="text-[11px] font-bold text-[#064F7C] uppercase tracking-wider">
                  AI Interpretation
                </span>
                <StatusBadge status={analyzedData.status} />
              </div>

              <div className="text-xs space-y-1.5 text-[#25313C]">
                <div>
                  <span className="font-semibold text-[#687582]">Activity:</span> {analyzedData.activity}
                </div>
                <div>
                  <span className="font-semibold text-[#687582]">Progress:</span> <strong className="text-[#123A63]">{analyzedData.progress}</strong>
                </div>
                <div>
                  <span className="font-semibold text-[#687582]">Delay Reason:</span> {analyzedData.delayReason}
                </div>
                <div>
                  <span className="font-semibold text-[#687582]">Expected Finish:</span> {analyzedData.expectedFinish}
                </div>
                <div>
                  <span className="font-semibold text-[#687582]">Remarks:</span> {analyzedData.remarks}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleApplyAnalysis}
                  className="flex-1 py-1.5 bg-[#064F7C] hover:bg-[#075985] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-1 transition cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm & Apply</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyzedData(null)}
                  className="px-3 py-1.5 bg-white border border-[#D9E0E6] hover:bg-[#F8FAFC] text-[#687582] text-xs font-semibold rounded-[4px] transition cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
