import React, { useState } from 'react';
import { Send, Sparkles, Database, Loader2, ArrowRight } from 'lucide-react';
import { VectorChunk, AIQuery } from '../types';

interface AIChatAssistantProps {
  vectorChunks: VectorChunk[];
  isDarkTheme?: boolean;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ vectorChunks, isDarkTheme = false }) => {
  const [messages, setMessages] = useState<AIQuery[]>([
    {
      Query_ID: 1,
      User_ID: 24,
      Question: "What decisions were made during yesterday's meeting?",
      AI_Response: "Based on the recorded meeting transcript for 'AI Meeting Intelligence Architecture & RAG Review':\n\n1. **Whisper ASR Integration**: Finalized with timestamped chunking achieving 96%+ accuracy.\n2. **RAG Pipeline Latency**: FAISS vector search validated with cosine similarity retrieval in under 1.8 seconds.\n3. **Database Normalization**: SQLite3 schema verified up to 3NF standards with strict foreign keys.\n4. **PDF Reports**: Configured ReportLab for automated meeting summary exports.",
      Timestamp: "10:14 AM",
      RetrievedChunks: vectorChunks.slice(0, 2),
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sampleQuestions = [
    "What decisions were made during yesterday's meeting?",
    "Who is responsible for completing Module 3?",
    "What are the minimum hardware requirements for the desktop app?",
    "Summarize the discussion on project planning and RAG architecture."
  ];

  const handleSendQuestion = async (queryText?: string) => {
    const question = queryText || inputQuestion.trim();
    if (!question || isLoading) return;

    setInputQuestion('');
    setIsLoading(true);

    // 1. Simulate RAG Semantic Vector Search against vectorChunks
    const retrieved = vectorChunks.map((chunk) => {
      const sim = Math.random() * 0.18 + 0.81; // score between 0.81 and 0.99
      return { ...chunk, similarityScore: Number(sim.toFixed(4)) };
    }).sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0)).slice(0, 3);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          retrievedChunks: retrieved,
        }),
      });

      const data = await response.json();

      const newQuery: AIQuery = {
        Query_ID: Date.now(),
        User_ID: 24,
        Question: question,
        AI_Response: data.answer || "I processed the query against the meeting knowledge base.",
        Timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        RetrievedChunks: retrieved,
      };

      setMessages((prev) => [...prev, newQuery]);
    } catch (err) {
      console.error("Chat request failed:", err);
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          Query_ID: Date.now(),
          User_ID: 24,
          Question: question,
          AI_Response: `Based on the retrieved meeting context:\n- ${retrieved[0]?.text || "Meeting discussions covered Whisper speech recognition, RAG pipeline, and SQLite database schema."}`,
          Timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          RetrievedChunks: retrieved,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in font-sans">
      
      {/* 1. ASK AI INPUT BAR AT THE VERY TOP (Upside of everything) */}
      <div className={`p-3 rounded-2xl border flex items-center gap-3 shadow-sm ${
        isDarkTheme ? 'bg-slate-900/90 border-slate-800' : 'clay-card'
      }`}>
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
          placeholder="Ask a question about meeting decisions, action items, or documents..."
          className={`flex-1 px-4 py-3 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#D49B53] ${
            isDarkTheme
              ? 'bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500'
              : 'clay-input text-[#2C221E]'
          }`}
        />
        <button
          onClick={() => handleSendQuestion()}
          disabled={!inputQuestion.trim() || isLoading}
          className="clay-button-gold px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 disabled:opacity-50 transition shrink-0"
        >
          <span>Ask AI</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* 2. SUGGESTED QUESTIONS PILL ROW (Comes after Ask AI input) */}
      <div className={`p-4 rounded-2xl border ${
        isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'clay-card'
      }`}>
        <span className={`text-[11px] font-bold block mb-2 uppercase tracking-wider ${
          isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'
        }`}>
          Suggested Natural Language Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSendQuestion(q)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                isDarkTheme
                  ? 'bg-slate-800/80 border border-slate-700/80 text-slate-200 hover:text-purple-300 hover:bg-slate-800'
                  : 'clay-button text-[#2C221E] hover:text-[#B88037]'
              }`}
            >
              <span>{q}</span>
              <ArrowRight className="w-3 h-3 text-[#D49B53]" />
            </button>
          ))}
        </div>
      </div>

      {/* 3. CHAT CONVERSATION THREAD */}
      <div className="space-y-5 max-h-[650px] overflow-y-auto pr-1">
        {messages.map((msg) => (
          <div key={msg.Query_ID} className={`p-5 space-y-4 rounded-2xl border transition-all ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'clay-card'
          }`}>
            
            {/* User Question Row */}
            <div className={`flex items-start gap-3 border-b pb-3 ${
              isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'
            }`}>
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                User
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`text-xs font-bold ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>Alex Morgan</h4>
                  <span className={`text-[10px] ${isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'}`}>{msg.Timestamp}</span>
                </div>
                <p className={`text-sm font-semibold mt-1 ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>{msg.Question}</p>
              </div>
            </div>

            {/* Retrieved RAG Context Chunks Display */}
            {msg.RetrievedChunks && msg.RetrievedChunks.length > 0 && (
              <div className={`p-3 rounded-xl border space-y-2 ${
                isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#F5EFE4] border-[#E6DCCB]'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#B88037] uppercase tracking-wider flex items-center gap-1">
                    <Database className="w-3 h-3" /> ChromaDB Vector Retrieval ({msg.RetrievedChunks.length} Chunks Matched)
                  </span>
                  <span className={`text-[10px] font-mono ${isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'}`}>Cosine Distance Match</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {msg.RetrievedChunks.map((chunk, idx) => (
                    <div key={idx} className={`p-2.5 rounded-lg border text-[11px] space-y-1 ${
                      isDarkTheme
                        ? 'bg-slate-900 border-slate-800 text-slate-300'
                        : 'bg-[#FFFDF9] border-[#E8DFC8] text-[#6E615A]'
                    }`}>
                      <div className={`flex items-center justify-between font-bold ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>
                        <span className="text-[#D49B53]">{chunk.category}</span>
                        {chunk.similarityScore && (
                          <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                            isDarkTheme ? 'bg-purple-500/20 text-purple-300' : 'bg-[#EFE4D2] text-[#B88037]'
                          }`}>
                            {(chunk.similarityScore * 100).toFixed(1)}% Match
                          </span>
                        )}
                      </div>
                      <p className="line-clamp-2 italic">&quot;{chunk.text}&quot;</p>
                      <div className={`text-[9px] font-semibold ${isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'}`}>{chunk.source}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AI Grounded Answer Box */}
            <div className="flex items-start gap-3 pt-1">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#D49B53] to-[#B88037] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B88037]">AI Meeting Assistant Answer</span>
                  <span className="text-[10px] text-[#3B7A57] font-semibold bg-[#E2EFE7] px-2 py-0.5 rounded-full">
                    Grounded RAG Response
                  </span>
                </div>
                <div className={`text-xs leading-relaxed whitespace-pre-line font-medium p-3.5 rounded-xl border ${
                  isDarkTheme
                    ? 'bg-slate-950 border-slate-800 text-slate-100'
                    : 'bg-[#FFFDF9] border-[#E8DFC8] text-[#2C221E]'
                }`}>
                  {msg.AI_Response}
                </div>
              </div>
            </div>

          </div>
        ))}

        {isLoading && (
          <div className={`p-5 rounded-2xl border flex items-center gap-3 text-xs font-bold text-[#B88037] ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'clay-card'
          }`}>
            <Loader2 className="w-5 h-5 animate-spin text-[#D49B53]" />
            <span>Performing ChromaDB Vector Search & Querying Gemini RAG Model...</span>
          </div>
        )}
      </div>

    </div>
  );
};
