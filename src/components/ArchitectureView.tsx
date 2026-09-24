import React, { useState } from 'react';
import { Layers, Database, Cpu, Monitor } from 'lucide-react';

interface ArchitectureViewProps {
  isDarkTheme?: boolean;
}

export const ArchitectureView: React.FC<ArchitectureViewProps> = ({ isDarkTheme = false }) => {
  const [activeLayer, setActiveLayer] = useState<'presentation' | 'business' | 'data'>('presentation');

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${
            isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'
          }`}>
            <Layers className="w-6 h-6 text-[#D49B53]" /> 3-Layer System Architecture & DFD Specification
          </h2>
          <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
            Technical architecture based on Chapter 4.3 (Three-Layer Design) and Chapter 5.4 Data Flow Diagrams.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
          isDarkTheme ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'clay-pill text-[#B88037] border-[#E6DCCB]'
        }`}>
          Document: Figure 4.5 & 4.6
        </div>
      </div>

      {/* Layer Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { id: 'presentation', title: '1. Presentation Layer', desc: 'CustomTkinter GUI / React 3D Interface', icon: Monitor },
          { id: 'business', title: '2. Business Logic Layer', desc: 'Whisper STT, LangChain, RAG Engine, LLM', icon: Cpu },
          { id: 'data', title: '3. Data Layer', desc: 'SQLite3 DB, ChromaDB/FAISS, Audio Files', icon: Database },
        ].map((layer) => {
          const Icon = layer.icon;
          const isSelected = activeLayer === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setActiveLayer(layer.id as any)}
              className={`p-5 rounded-2xl text-left transition-all duration-200 border ${
                isSelected
                  ? isDarkTheme
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-xl transform -translate-y-1'
                    : 'bg-[#2C221E] text-white border-[#2C221E] shadow-xl transform -translate-y-1'
                  : isDarkTheme
                    ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
                    : 'clay-card hover:bg-[#F3ECE0] text-[#2C221E]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-amber-300' : 'text-[#D49B53]'}`} />
                {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />}
              </div>
              <h3 className="font-bold text-sm leading-snug">{layer.title}</h3>
              <p className={`text-[11px] mt-1 ${isSelected ? 'text-slate-200' : isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                {layer.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Deep Dive for Active Layer */}
      <div className={`p-6 space-y-6 rounded-3xl border ${
        isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'clay-card text-[#2C221E]'
      }`}>
        
        {activeLayer === 'presentation' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className={`text-base font-bold flex items-center gap-2 ${
              isDarkTheme ? 'text-purple-300' : 'text-[#2C221E]'
            }`}>
              <Monitor className="w-5 h-5 text-[#D49B53]" /> Presentation Layer Modules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'User Authentication GUI', file: 'login.py', desc: 'Encrypted login & registration screen' },
                { name: '3D Meeting Dashboard', file: 'dashboard.py', desc: 'Central navigation & active recording orb' },
                { name: 'Audio Recorder Widget', file: 'recorder.py', desc: 'Live microphone signal capture' },
                { name: 'RAG AI Chat Interface', file: 'ai_chat.py', desc: 'Natural language Q&A conversation thread' },
                { name: '3D Vector Graph View', file: 'vector_store.py', desc: 'Interactive WebGL node visualizer' },
                { name: 'PDF Report Viewer', file: 'report_generator.py', desc: 'Downloadable meeting summaries' },
              ].map((m, i) => (
                <div key={i} className={`p-3.5 rounded-xl border space-y-1 text-xs ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800/80 text-slate-200' : 'bg-[#FFFDF9] border-[#E8DFC8] text-[#2C221E]'
                }`}>
                  <div className="font-bold">{m.name}</div>
                  <div className="font-mono text-[10px] text-[#D49B53]">{m.file}</div>
                  <p className={`text-[11px] ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeLayer === 'business' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className={`text-base font-bold flex items-center gap-2 ${
              isDarkTheme ? 'text-purple-300' : 'text-[#2C221E]'
            }`}>
              <Cpu className="w-5 h-5 text-indigo-400" /> Business Logic Processing Engine
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'OpenAI Whisper Engine', file: 'whisper_engine.py', desc: 'Speech-to-text with 96%+ transcription accuracy' },
                { name: 'LangChain Orchestrator', file: 'ai_chat.py', desc: 'Constructs context-augmented prompts for LLM' },
                { name: 'LlamaIndex Document Parser', file: 'document_loader.py', desc: 'Chunking PDF/DOCX into 512-token segments' },
                { name: 'Cosine Similarity Finder', file: 'vector_store.py', desc: 'Top-K semantic vector match finder' },
                { name: 'Gemini LLM Provider', file: 'server.ts', desc: 'Zero-hallucination answer generation' },
                { name: 'ReportLab PDF Engine', file: 'report_generator.py', desc: 'Vector layout report compilation' },
              ].map((m, i) => (
                <div key={i} className={`p-3.5 rounded-xl border space-y-1 text-xs ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800/80 text-slate-200' : 'bg-[#FFFDF9] border-[#E8DFC8] text-[#2C221E]'
                }`}>
                  <div className="font-bold">{m.name}</div>
                  <div className="font-mono text-[10px] text-indigo-400">{m.file}</div>
                  <p className={`text-[11px] ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeLayer === 'data' && (
          <div className="space-y-4 animate-fade-in">
            <h3 className={`text-base font-bold flex items-center gap-2 ${
              isDarkTheme ? 'text-purple-300' : 'text-[#2C221E]'
            }`}>
              <Database className="w-5 h-5 text-emerald-400" /> Data Layer & Local Storage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { name: 'SQLite3 Relational DB', file: 'database/meeting.db', desc: '3NF normalized relational schema' },
                { name: 'ChromaDB Vector Store', file: 'embeddings/', desc: 'Persistent 5D dense vector embeddings' },
                { name: 'FAISS CPU Index', file: 'embeddings/faiss.idx', desc: 'High-speed index for instant similarity search' },
                { name: 'Audio Records Storage', file: 'audio/*.mp3', desc: 'Local raw WAV/MP3 recording files' },
                { name: 'Document Knowledge Base', file: 'documents/', desc: 'Uploaded PDFs, DOCX, and TXT references' },
                { name: 'Generated PDF Storage', file: 'reports/*.pdf', desc: 'Compiled meeting summary PDF exports' },
              ].map((m, i) => (
                <div key={i} className={`p-3.5 rounded-xl border space-y-1 text-xs ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800/80 text-slate-200' : 'bg-[#FFFDF9] border-[#E8DFC8] text-[#2C221E]'
                }`}>
                  <div className="font-bold">{m.name}</div>
                  <div className="font-mono text-[10px] text-emerald-400">{m.file}</div>
                  <p className={`text-[11px] ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
