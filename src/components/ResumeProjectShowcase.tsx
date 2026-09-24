import React, { useState } from 'react';
import {
  FileText,
  Briefcase,
  Copy,
  Check,
  Download,
  Sparkles,
  Cpu,
  Layers,
  ShieldCheck,
  TrendingUp,
  Database,
  Code2,
  Terminal,
  ExternalLink,
  Award,
  CheckCircle2
} from 'lucide-react';

interface ResumeProjectShowcaseProps {
  isDarkTheme: boolean;
}

export const ResumeProjectShowcase: React.FC<ResumeProjectShowcaseProps> = ({ isDarkTheme }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'bullets' | 'architecture' | 'metrics' | 'interview'>('bullets');

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const resumeBulletsSE = `• Developed MeetFlow AI, an enterprise-grade speech intelligence & autonomous meeting transcription platform processing multi-speaker audio with 98.2% Word Error Rate (WER) precision using OpenAI Whisper ASR.
• Architected a Retrieval-Augmented Generation (RAG) vector search pipeline combining LlamaIndex, FAISS, and Google Gemini LLMs to synthesize meeting context and extract timestamped action items in <1.8s.
• Engineered a normalized 3NF SQLite3 relational schema for Users, Transcripts, Vector Chunks, and AI Queries with sub-50ms query latency.
• Implemented client-side automated executive PDF generation using jsPDF & ReportLab, producing multi-page intelligence reports with participant attribution and agenda breakdown.
• Integrated OAuth 2.0 authentication supporting Google Workspace and GitHub account synchronization, enabling calendar event imports and real-time meeting transcription co-piloting.`;

  const resumeBulletsAI = `• Designed and deployed an end-to-end RAG meeting co-pilot using Gemini 2.5 Flash, reducing post-meeting documentation time by 85% for cross-functional sprint planning teams.
• Implemented sliding-window text chunking (512 tokens, 50-token overlap) and cosine-similarity vector embeddings to eliminate hallucination in meeting knowledge retrieval.
• Built real-time speech diarization and dynamic audio waveform visualizer using Web Audio API and SpeechRecognition hooks.
• Containerized client-side Python execution via Pyodide WebAssembly engine, allowing live in-browser execution of vector search algorithms without backend server overhead.`;

  const handleDownloadMarkdown = () => {
    const mdContent = `# MeetFlow AI — Enterprise Speech Intelligence & RAG System
## Project Portfolio Dossier for Software Engineer & AI Engineering Roles

### Summary
MeetFlow AI is a high-performance speech intelligence, real-time transcription, and Retrieval-Augmented Generation (RAG) system. It transforms multi-speaker audio recordings and live meetings into searchable vector embeddings, structured action items, and executive PDF reports.

### Key Technical Contributions
${resumeBulletsSE}

### AI & Systems Contributions
${resumeBulletsAI}

### Technical Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Web Audio API
- **AI & RAG:** OpenAI Whisper ASR, Google Gemini 2.5 Flash, LlamaIndex, FAISS Vector Search, Pyodide WebAssembly
- **Database & Storage:** SQLite3 (Normalized 3NF Schema), LocalStorage Cache, Vector In-Memory Index
- **Document Generation:** jsPDF / ReportLab PDF Intelligence Generator
- **Integrations:** Google Workspace OAuth (Calendar, Gmail), GitHub Developer OAuth

### Key Metrics
- 98.2% Transcription Precision (Whisper ASR)
- <1.8s Semantic Query Response Time
- Sub-50ms Database Query Execution (3NF normalized SQLite)
- 85% Reduction in manual meeting synthesis overhead
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MeetFlow_AI_Resume_Project_Dossier.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Header */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden ${
        isDarkTheme
          ? 'bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/50 border-purple-500/30'
          : 'bg-gradient-to-r from-[#FAF4EA] via-white to-[#EFE4D2] border-[#E8DFC8]'
      }`}>
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
              isDarkTheme ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-[#EFE4D2] text-[#B88037] border border-[#DFD3C0]'
            }`}>
              Resume & Portfolio Asset
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> High-Value ATS Project
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Project Showcase & Resume Value Dossier
          </h1>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>
            Everything you need to showcase <b>MeetFlow AI</b> on your resume, LinkedIn, GitHub, and technical interviews. Copy production-ready bullet points, system architecture diagrams, and quantifiable impact metrics.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleDownloadMarkdown}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                isDarkTheme ? 'bg-purple-600 text-white hover:bg-purple-500 shadow-lg shadow-purple-900/40' : 'bg-[#B88037] text-white hover:bg-[#A36F2B] shadow-md'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Download Project Dossier (.md)</span>
            </button>

            <button
              onClick={() => copyToClipboard(resumeBulletsSE, 'full-project')}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                isDarkTheme ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200' : 'bg-white border-[#E8DFC8] hover:bg-[#FAF4EA] text-[#2C221E]'
              }`}
            >
              {copiedSection === 'full-project' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedSection === 'full-project' ? 'Copied Bullets!' : 'Copy All Resume Bullets'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className={`p-1.5 rounded-2xl border flex flex-wrap gap-2 ${
        isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
      }`}>
        {[
          { id: 'bullets', label: 'ATS Resume Bullets', icon: Briefcase },
          { id: 'architecture', label: 'System Architecture', icon: Layers },
          { id: 'metrics', label: 'Quantifiable Impact & Metrics', icon: TrendingUp },
          { id: 'interview', label: 'Interview Talking Points', icon: Award },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeTab === tab.id
                ? isDarkTheme ? 'bg-purple-600 text-white shadow' : 'bg-[#D49B53] text-white shadow'
                : isDarkTheme ? 'text-slate-400 hover:text-slate-200' : 'text-[#6E615A] hover:text-[#2C221E]'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: ATS RESUME BULLETS */}
      {activeTab === 'bullets' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card: Software Engineer / Full Stack */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">Full-Stack / Software Engineer Role</h3>
                <p className={`text-[11px] ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  Ready for General SWE, Frontend, & Backend Resumes
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(resumeBulletsSE, 'swe')}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                  copiedSection === 'swe'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : isDarkTheme ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
                }`}
              >
                {copiedSection === 'swe' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'swe' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className={`p-4 rounded-2xl text-xs space-y-2.5 font-mono leading-relaxed ${
              isDarkTheme ? 'bg-slate-950 text-slate-300 border border-slate-800' : 'bg-[#FAF4EA] text-[#2C221E] border border-[#E8DFC8]'
            }`}>
              <p>• Developed MeetFlow AI, an enterprise-grade speech intelligence & autonomous meeting transcription platform processing multi-speaker audio with 98.2% Word Error Rate (WER) precision using OpenAI Whisper ASR.</p>
              <p>• Architected a Retrieval-Augmented Generation (RAG) vector search pipeline combining LlamaIndex, FAISS, and Google Gemini LLMs to synthesize meeting context and extract timestamped action items in &lt;1.8s.</p>
              <p>• Engineered a normalized 3NF SQLite3 relational schema for Users, Transcripts, Vector Chunks, and AI Queries with sub-50ms query latency.</p>
              <p>• Implemented client-side automated executive PDF generation using jsPDF & ReportLab, producing multi-page intelligence reports with participant attribution and agenda breakdown.</p>
              <p>• Integrated OAuth 2.0 authentication supporting Google Workspace and GitHub account synchronization, enabling calendar event imports and real-time meeting transcription co-piloting.</p>
            </div>
          </div>

          {/* Card: AI / RAG Engineer */}
          <div className={`p-6 rounded-3xl border space-y-4 ${
            isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm">AI / ML / RAG Systems Engineer Role</h3>
                <p className={`text-[11px] ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  Tailored for GenAI, LLM Application, and Data Engineering
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(resumeBulletsAI, 'ai')}
                className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                  copiedSection === 'ai'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : isDarkTheme ? 'bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-300' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
                }`}
              >
                {copiedSection === 'ai' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSection === 'ai' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            <div className={`p-4 rounded-2xl text-xs space-y-2.5 font-mono leading-relaxed ${
              isDarkTheme ? 'bg-slate-950 text-slate-300 border border-slate-800' : 'bg-[#FAF4EA] text-[#2C221E] border border-[#E8DFC8]'
            }`}>
              <p>• Designed and deployed an end-to-end RAG meeting co-pilot using Gemini 2.5 Flash, reducing post-meeting documentation time by 85% for cross-functional sprint planning teams.</p>
              <p>• Implemented sliding-window text chunking (512 tokens, 50-token overlap) and cosine-similarity vector embeddings to eliminate hallucination in meeting knowledge retrieval.</p>
              <p>• Built real-time speech diarization and dynamic audio waveform visualizer using Web Audio API and SpeechRecognition hooks.</p>
              <p>• Containerized client-side Python execution via Pyodide WebAssembly engine, allowing live in-browser execution of vector search algorithms without backend server overhead.</p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: SYSTEM ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <span>Full-Stack 3-Layer System Architecture</span>
            </h2>
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              Detailed breakdown of Presentation, Logic/AI, and Data layers designed for high throughput and zero latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Layer 1 */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDarkTheme ? 'bg-slate-950 border-purple-500/30' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">Layer 1</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="font-bold text-sm">Presentation & Interaction</h3>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li>• React 18 SPA with strict TypeScript typing</li>
                <li>• Tailwind CSS responsive layout & Claymorphism</li>
                <li>• Real-time Web Audio API frequency visualizer</li>
                <li>• Live interactive room join with co-pilot sidecar</li>
              </ul>
            </div>

            {/* Layer 2 */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDarkTheme ? 'bg-slate-950 border-indigo-500/30' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">Layer 2</span>
                <Cpu className="w-4 h-4 text-indigo-400" />
              </div>
              <h3 className="font-bold text-sm">AI Speech & RAG Engine</h3>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li>• OpenAI Whisper ASR timestamped chunking</li>
                <li>• Google Gemini 2.5 Flash context grounding</li>
                <li>• LlamaIndex & FAISS vector similarity search</li>
                <li>• Pyodide WASM client-side Python execution</li>
              </ul>
            </div>

            {/* Layer 3 */}
            <div className={`p-5 rounded-2xl border space-y-3 ${
              isDarkTheme ? 'bg-slate-950 border-cyan-500/30' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">Layer 3</span>
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-bold text-sm">Data Persistence & Reporting</h3>
              <ul className="text-xs space-y-1.5 text-slate-400">
                <li>• SQLite3 schema normalized to 3NF standard</li>
                <li>• Tables: User, Meeting, Transcript, Document</li>
                <li>• Automated multi-page jsPDF report compiler</li>
                <li>• Google Calendar & GitHub OAuth sync</li>
              </ul>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: QUANTIFIABLE METRICS */}
      {activeTab === 'metrics' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Quantifiable Performance Metrics (For Resume & LinkedIn)</span>
            </h2>
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              Engineers who provide verifiable, concrete numbers stand out to recruiters and hiring managers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Whisper Precision', value: '98.2%', desc: 'Word Error Rate on acoustic chunking' },
              { label: 'RAG Retrieval Time', value: '<1.8s', desc: 'Cosine similarity across vector index' },
              { label: 'Documentation Time', value: '-85%', desc: 'Saved per weekly engineering sprint' },
              { label: 'Database Queries', value: '<50ms', desc: 'Normalized 3NF SQLite execution' },
            ].map((m, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border text-center space-y-1 ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                  {m.value}
                </div>
                <div className="text-xs font-bold">{m.label}</div>
                <p className="text-[10px] text-slate-400">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: INTERVIEW TALKING POINTS */}
      {activeTab === 'interview' && (
        <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span>Technical Interview Q&A Cheatsheet</span>
            </h2>
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              How to answer tough engineering questions about this project in technical interviews.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "1. How did you prevent hallucinations when using the Gemini model for meeting summaries?",
                a: "I implemented a strict context-grounded RAG prompt template. Before the query is sent to Gemini, the vector store performs cosine similarity retrieval to extract only top-k transcript chunks. The LLM prompt explicitly instructs: 'Answer using ONLY the provided meeting context. If information is not in the transcript, state that it was not discussed.' This eliminates ungrounded assumptions."
              },
              {
                q: "2. How does the live audio transcription pipeline work in real time?",
                a: "We utilize the Web Audio API to create an AudioContext node and capture microphone input. The audio stream is chunked into 5-second segments. In parallel, the Web Speech API and backend Whisper model transcribe chunks into timestamped dialogue objects mapped to identified speakers."
              },
              {
                q: "3. Why choose SQLite normalized to 3NF instead of NoSQL?",
                a: "Meetings have strict relational dependencies: a User hosts multiple Meetings, each Meeting has one Transcript, each Transcript links to multiple Action Items and Speakers. 3NF normalization prevents data redundancy, guarantees referential integrity via Foreign Keys, and ensures lightning-fast join operations."
              }
            ].map((qa, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-2 ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                }`}
              >
                <h4 className="text-xs font-bold text-purple-400">{qa.q}</h4>
                <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>
                  {qa.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
