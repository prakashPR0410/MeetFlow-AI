import React, { useState } from 'react';
import {
  FileText,
  CheckCircle2,
  Download,
  Calendar,
  Clock,
  User,
  Sparkles,
  Bot,
  Play,
  Share2,
  MessageSquare,
  AlertCircle,
  ListTodo,
  CheckSquare,
  Square
} from 'lucide-react';
import { Meeting } from '../types';

interface AISummaryViewProps {
  meeting: Meeting | null;
  onToggleActionItem: (meetingId: number, actionId: string) => void;
  onOpenPDFGenerator: () => void;
  onOpenAIChat: () => void;
  isDarkTheme: boolean;
}

export const AISummaryView: React.FC<AISummaryViewProps> = ({
  meeting,
  onToggleActionItem,
  onOpenPDFGenerator,
  onOpenAIChat,
  isDarkTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions' | 'speakers'>('summary');

  if (!meeting) {
    return (
      <div className={`p-12 rounded-3xl border text-center space-y-4 ${
        isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#E8DFC8]'
      }`}>
        <AlertCircle className="w-10 h-10 text-purple-400 mx-auto" />
        <h2 className="text-lg font-bold">No Meeting Selected</h2>
        <p className="text-xs text-slate-400">Select a meeting from the Dashboard or History tab to view its AI summary.</p>
      </div>
    );
  }

  const transcript = meeting.Transcript;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Header with Actions */}
      <div className={`p-6 sm:p-8 rounded-3xl border space-y-4 relative overflow-hidden shadow-xl ${
        isDarkTheme ? 'bg-gradient-to-r from-slate-900 via-purple-950/30 to-slate-900 border-purple-500/30' : 'bg-gradient-to-r from-[#FAF4EA] to-[#F5EFE4] border-[#E8DFC8]'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                AI Intelligence Summary
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-purple-400" /> {meeting.Meeting_Date}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-400" /> {meeting.Duration} mins
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-purple-300">
              {meeting.Meeting_Title}
            </h1>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenPDFGenerator}
              className="flex-1 md:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF Summary</span>
            </button>

            <button
              onClick={onOpenAIChat}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition flex items-center justify-center gap-2 ${
                isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-[#E8DFC8] text-[#2C221E]'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Chat</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className={`p-1 rounded-2xl border inline-flex items-center gap-1 ${
          isDarkTheme ? 'bg-slate-950/80 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
        }`}>
          {[
            { id: 'summary', label: 'AI Summary & Key Takeaways' },
            { id: 'actions', label: 'Action Items' },
            { id: 'transcript', label: 'Full Transcript' },
            { id: 'speakers', label: 'Speaker Breakdown' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow'
                  : isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT: SUMMARY & TAKEAWAYS */}
      {activeTab === 'summary' && (
        <div className="w-full">
          
          {/* Summary Box */}
          <div className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
            isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
          }`}>
            <div>
              <h2 className="font-bold text-base text-purple-400 flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-[#B88037]" /> Executive Summary
              </h2>
              <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}`}>
                {transcript?.Summary || 'No summary generated yet.'}
              </p>
            </div>

            <div className={`border-t pt-6 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'} space-y-3`}>
              <h3 className="font-bold text-sm text-[#B88037] flex items-center gap-2">
                <Bot className="w-4 h-4" /> Key Takeaways
              </h3>
              <ul className="space-y-2.5 text-xs">
                {transcript?.KeyTakeaways?.map((kt, i) => (
                  <li key={i} className={`flex items-start gap-2.5 p-3 rounded-xl border ${
                    isDarkTheme ? 'bg-purple-500/10 border-purple-500/20 text-slate-200' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-[#B88037] shrink-0 mt-0.5" />
                    <span>{kt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: FULL TRANSCRIPT */}
      {activeTab === 'transcript' && (
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <h2 className="font-bold text-sm text-purple-400 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Full Speech Transcript
          </h2>
          <div className={`p-5 rounded-2xl border font-mono text-xs leading-relaxed whitespace-pre-wrap ${
            isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
          }`}>
            {transcript?.Transcript_Text || 'No transcript text available.'}
          </div>
        </div>
      )}

      {/* TAB CONTENT: ACTION ITEMS FULL LIST */}
      {activeTab === 'actions' && (
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <h2 className="font-bold text-sm text-amber-400 flex items-center gap-2">
            <ListTodo className="w-4 h-4" /> Assigned Action Items & Deadlines
          </h2>

          <div className="space-y-3">
            {transcript?.ActionItems?.map((act) => (
              <div
                key={act.id}
                onClick={() => onToggleActionItem(meeting.Meeting_ID, act.id)}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 cursor-pointer transition ${
                  act.status === 'completed'
                    ? 'bg-emerald-500/10 border-emerald-500/20 opacity-70'
                    : isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {act.status === 'completed' ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-purple-400 shrink-0" />
                  )}
                  <div>
                    <p className={`text-xs font-bold ${act.status === 'completed' ? 'line-through text-slate-400' : ''}`}>
                      {act.task}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Assignee: <b>{act.assignee}</b> • Deadline: <b>{act.deadline}</b>
                    </p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                  act.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {act.status === 'completed' ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SPEAKERS */}
      {activeTab === 'speakers' && (
        <div className={`p-6 rounded-3xl border space-y-4 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <h2 className="font-bold text-sm text-cyan-400 flex items-center gap-2">
            <User className="w-4 h-4" /> Speaker Highlights & Dialogue Timestamps
          </h2>

          <div className="space-y-3">
            {transcript?.Speakers?.map((sp, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border space-y-1 text-xs ${
                isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
              }`}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-purple-400">{sp.speaker}</span>
                  <span className="font-mono text-slate-400">{sp.timestamp}</span>
                </div>
                <p className={isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}>{sp.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
