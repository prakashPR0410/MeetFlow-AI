import React from 'react';
import {
  Mic,
  FileText,
  Upload,
  Bot,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Download,
  BarChart3,
  Video,
  Play
} from 'lucide-react';
import { Meeting } from '../types';

interface DashboardViewProps {
  meetings: Meeting[];
  onNavigate: (tab: string) => void;
  onSelectMeeting: (meeting: Meeting) => void;
  isDarkTheme: boolean;
  userName: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  meetings,
  onNavigate,
  onSelectMeeting,
  isDarkTheme,
  userName,
}) => {
  const totalMeetings = meetings.length;
  const totalHoursSaved = Math.round(meetings.reduce((acc, m) => acc + m.Duration, 0) * 0.85);
  const completedActions = meetings.flatMap(m => m.Transcript?.ActionItems || []).filter(a => a.status === 'completed').length;
  const pendingActions = meetings.flatMap(m => m.Transcript?.ActionItems || []).filter(a => a.status !== 'completed').length;

  return (
    <div className="space-y-7 font-sans">
      
      {/* Top Welcome Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden shadow-sm transition-all ${
        isDarkTheme
          ? 'bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border-purple-500/30'
          : 'bg-gradient-to-r from-[#FAF4EA] via-[#F5EFE4] to-[#EFE4D2] border-[#E8DFC8]'
      }`}>
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D49B53]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 border ${
              isDarkTheme ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-[#EFE4D2] text-[#B88037] border-[#DFD3C0]'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-[#B88037]" />
              <span>AI Intelligence Dashboard</span>
            </div>
            <h1 className={`text-lg sm:text-xl font-bold tracking-tight ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>
              Good Morning, {userName}! 👋
            </h1>
            <p className={`mt-1 text-[11px] sm:text-xs font-medium max-w-xl ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              Your AI Meeting Assistant has processed <span className="font-bold text-[#B88037]">{totalMeetings} meetings</span> with sub-2s vector retrieval & automated action item tracking.
            </p>
          </div>

          {/* Quick Action Bar - Join Live Meeting */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onNavigate('transcripts')}
              className={`px-5 py-3 rounded-xl text-sm font-bold text-white shadow-md transition transform hover:-translate-y-0.5 flex items-center gap-2.5 ${
                isDarkTheme ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : 'bg-[#B88037] hover:bg-[#A36F2B]'
              }`}
            >
              <Video className="w-4.5 h-4.5 animate-pulse text-white" />
              <span className="text-sm font-bold tracking-wide">Join Live Meeting</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Module Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {[
          {
            id: 'summary',
            title: 'AI Summary',
            desc: 'View key decisions & action items',
            icon: Sparkles,
            color: 'from-[#D49B53] to-[#B88037]',
            badge: 'Summary'
          },
          {
            id: 'transcripts',
            title: 'Meeting History',
            desc: 'Search past transcripts & logs',
            icon: Video,
            color: 'from-[#B88037] to-[#8C7A6B]',
            badge: 'History'
          },
          {
            id: 'reports',
            title: 'PDF Generator',
            desc: 'Export executive PDF reports',
            icon: Download,
            color: 'from-[#3B7A57] to-[#2E5E43]',
            badge: 'Reports'
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className={`p-5 rounded-2xl border cursor-pointer transition transform hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between ${
                isDarkTheme ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50' : 'clay-card hover:border-[#D49B53]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${card.color} text-white shadow-sm flex items-center justify-center group-hover:scale-105 transition`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    isDarkTheme ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-[#FAF4EA] text-[#B88037] border-[#E8DFC8]'
                  }`}>
                    {card.badge}
                  </span>
                </div>
                <h3 className={`font-bold text-sm mb-1 group-hover:text-[#B88037] transition ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>{card.title}</h3>
                <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>{card.desc}</p>
              </div>

              <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-[#B88037] group-hover:translate-x-1 transition">
                <span>Open Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Meetings Full-Width Container */}
      <div className={`p-5 sm:p-7 rounded-3xl border space-y-4 ${
        isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'clay-card'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3.5 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
          <div>
            <h2 className={`font-bold text-sm sm:text-base tracking-tight flex items-center gap-2 ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>
              <FileText className="w-4 h-4 text-[#B88037]" />
              <span>Recent Meetings & AI Transcripts</span>
            </h2>
            <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              Click any meeting to view full AI transcript & export PDF
            </p>
          </div>

          <button
            onClick={() => onNavigate('transcripts')}
            className="text-xs font-bold text-[#B88037] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {meetings.map((m) => (
            <div
              key={m.Meeting_ID}
              onClick={() => onSelectMeeting(m)}
              className={`p-4 rounded-2xl border transition duration-200 cursor-pointer group hover:border-[#D49B53]/60 flex flex-col justify-between space-y-3 ${
                isDarkTheme ? 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-950' : 'bg-[#FAF4EA] border-[#E8DFC8] hover:bg-[#F3ECE0]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className={`font-bold text-xs sm:text-sm group-hover:text-[#B88037] transition line-clamp-1 ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>
                    {m.Meeting_Title}
                  </h3>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-800 font-bold border border-emerald-500/20 text-[10px] shrink-0">
                    Completed
                  </span>
                </div>
                <div className={`flex items-center gap-3 text-[11px] mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#B88037]" /> {m.Meeting_Date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#8C7A6B]" /> {m.Duration} mins</span>
                </div>
              </div>

              {m.Transcript?.Summary && (
                <p className={`text-xs leading-relaxed line-clamp-2 ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>
                  {m.Transcript.Summary}
                </p>
              )}

              <div className="pt-1 flex items-center justify-end">
                <button className="px-2.5 py-1 rounded-xl text-xs font-bold bg-[#B88037] text-white shadow hover:bg-[#A36F2B] transition flex items-center gap-1">
                  <span>AI Summary</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
