import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ProjectSelector from '../components/ProjectSelector';
import {
  ChevronRight,
  Send,
  Bot,
  User,
  Sparkles,
  HelpCircle,
  Loader2,
} from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  'What needs my attention today?',
  'Why are we behind schedule?',
  'Which activities are delayed?',
  'Show material-related delays.',
  'What changed since yesterday?',
  'Which activity has the highest variance?',
];

const MOCK_ANSWERS = {
  'What needs my attention today?':
    'Today’s highest priority is **Line 24 Erection (PIP-L5-024)**, which is currently 40% below baseline. Procurement coordination for 24-inch carbon steel pipes is urgently required to avoid slippage of the milestone finish date (13 Sep 2026).',
  'Why are we behind schedule?':
    'The project is currently tracking **9% behind baseline** (69% actual vs 78% planned). The primary root cause is raw material supply shortages in the piping discipline and specialized welder availability at the Duliajan site.',
  'Which activities are delayed?':
    'Currently, 2 activities are classified as **Delayed**:\n1. Line 24 Erection (PIP-L5-024) — Variance: -40%\n2. Pump P-102 Installation (MECH-L5-011) — Variance: -23%\n\nAdditionally, Cable Tray Installation (ELEC-L5-018) is **At Risk** (-12% variance).',
  'Show material-related delays.':
    'Material-related delays affecting the project:\n- **Line 24 Erection (Piping)**: Awaiting 24-inch carbon steel pipe consignment.\n- **Cable Tray Installation (Electrical)**: Vendor delivery delay for Tier-2 galvanised brackets.',
  'What changed since yesterday?':
    '- Line 24 Erection reported progress increased from 58% to 60%.\n- Pump P-102 foundation alignment check was signed off by Field Lead M. Sharma.\n- 1 new inspection task logged for Civil segment grouting.',
  'Which activity has the highest variance?':
    '**Line 24 Erection (PIP-L5-024)** holds the highest variance at **-40%** (Planned: 100%, Actual: 60%). Projected overall critical-path delay is 8 working days.',
};

export default function AIAssistant() {
  const [selectedProject, setSelectedProject] = useState('Pipeline Expansion Project (OIL-PIPE-2026-01)');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello. I am Project AI, your project execution assistant.\n\nHow can I help you today?',
      time: '10:00 AM',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendQuery = (queryText) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend) return;

    const userMessage = {
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const answer =
        MOCK_ANSWERS[textToSend] ||
        `The project is currently 9% behind baseline progress.\n\nThe highest-priority activity is Line 24 Erection, currently 40% below planned progress due to a material shortage.\n\nExpected completion is 8 days beyond the baseline finish date.`;

      const aiResponse = {
        sender: 'ai',
        text: answer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 500);
  };

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#687582] flex items-center gap-1.5 font-medium">
        <NavLink to="/" className="hover:text-[#123A63] hover:underline">Home</NavLink>
        <ChevronRight className="w-3.5 h-3.5 text-[#89939D]" />
        <span className="text-[#25313C] font-semibold">Ask Project AI</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9E0E6]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-[#123A63] font-['Inter',sans-serif]">
              Ask Project AI
            </h1>
            <span className="px-2 py-0.5 bg-[#FAF1E4] text-[#B7791F] border border-[#F3DEC3] text-[11px] font-semibold rounded-[3px] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C9822B]" />
              <span>Project Execution Intelligence</span>
            </span>
          </div>
          <p className="text-xs text-[#687582] mt-0.5">
            Get intelligent assistance with project execution information.
          </p>
        </div>

        <ProjectSelector
          selectedProject={selectedProject}
          onSelect={setSelectedProject}
        />
      </div>

      {/* Main Grid: Chat Area + Suggested Questions Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left (8 cols): Structured Chat Area */}
        <div className="lg:col-span-8 bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col h-[560px] overflow-hidden">
          {/* Messages Header */}
          <div className="px-4 py-2.5 bg-[#F2F4F6] border-b border-[#DCE2E7] flex items-center justify-between">
            <span className="text-xs font-bold text-[#123A63] uppercase tracking-wider">
              Project Execution Assistant
            </span>
            <span className="text-[11px] text-[#687582]">Context: {selectedProject.split(' ')[0]} Project</span>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-3 ${
                  msg.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-[4px] flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-[#123A63] text-white'
                      : 'bg-[#064F7C] text-white'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-3.5 rounded-[5px] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#EBF3F8] text-[#123A63] border border-[#CCE0ED]'
                      : 'bg-[#F8F9FA] text-[#25313C] border border-[#D9E0E6]'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <span className="text-[10px] text-[#89939D] mt-1.5 block text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#687582] p-2 bg-[#F8F9FA] border border-[#D9E0E6] rounded-[4px] w-fit">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#064F7C]" />
                <span>Project AI is computing project metrics...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="p-3 bg-[#F2F4F6] border-t border-[#DCE2E7] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about project progress, delays or activities..."
              className="flex-1 px-3 py-2 bg-white border border-[#D9E0E6] rounded-[4px] text-xs text-[#25313C] focus:outline-none focus:border-[#064F7C]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2 bg-[#064F7C] hover:bg-[#075985] text-white text-xs font-semibold rounded-[4px] flex items-center gap-1.5 transition cursor-pointer disabled:opacity-60"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Right (4 cols): Suggested Queries Panel */}
        <div className="lg:col-span-4 bg-white rounded-[6px] border border-[#D9E0E6] shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden h-fit">
          <div className="px-4 py-3 bg-[#F2F4F6] border-b border-[#DCE2E7]">
            <h2 className="text-xs font-bold text-[#123A63] uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#064F7C]" />
              <span>Suggested Inquiries</span>
            </h2>
          </div>

          <div className="p-3 space-y-2">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendQuery(q)}
                className="w-full text-left p-2.5 rounded-[4px] bg-[#F8F9FA] hover:bg-[#EBF3F8] border border-[#D9E0E6] hover:border-[#064F7C] text-xs font-medium text-[#25313C] transition cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
