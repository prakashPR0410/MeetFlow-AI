import React, { useState } from 'react';
import { FileText, CheckCircle2, Clock, User, Sparkles, Search, CheckSquare, Square, Download } from 'lucide-react';
import { Meeting } from '../types';

interface TranscriptsViewProps {
  meetings: Meeting[];
  onToggleActionItem: (meetingId: number, actionId: string) => void;
}

export const TranscriptsView: React.FC<TranscriptsViewProps> = ({
  meetings,
  onToggleActionItem,
}) => {
  const [selectedMeetingId, setSelectedMeetingId] = useState<number>(meetings[0]?.Meeting_ID || 101);
  const [activeSubTab, setActiveTab] = useState<'summary' | 'transcript' | 'actions'>('summary');
  const [searchTerm, setSearchTerm] = useState('');

  const currentMeeting = meetings.find((m) => m.Meeting_ID === selectedMeetingId) || meetings[0];

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#2C221E] tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-[#D49B53]" /> Meeting Transcripts & AI Summaries
          </h2>
          <p className="text-xs text-[#6E615A]">
            Whisper-transcribed meeting logs, key takeaways, and interactive action items tracking.
          </p>
        </div>
        <div className="clay-pill px-3 py-1 rounded-full text-xs font-bold text-[#B88037] border border-[#E6DCCB]">
          Module: whisper_engine.py & database.py
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Meeting Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold text-[#8C7A6B] uppercase tracking-wider px-1">
            Recorded Meetings ({meetings.length})
          </div>

          <div className="space-y-3">
            {meetings.map((meeting) => {
              const isSelected = meeting.Meeting_ID === selectedMeetingId;
              return (
                <button
                  key={meeting.Meeting_ID}
                  onClick={() => setSelectedMeetingId(meeting.Meeting_ID)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#2C221E] to-[#3D2E28] text-[#FAF6EE] shadow-lg transform translate-x-1'
                      : 'clay-card hover:bg-[#F3ECE0]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#D49B53] text-white' : 'bg-[#EFE4D2] text-[#8C7A6B]'
                    }`}>
                      ID: #{meeting.Meeting_ID}
                    </span>
                    <span className={`text-[10px] font-semibold flex items-center gap-1 ${
                      isSelected ? 'text-[#D49B53]' : 'text-[#6E615A]'
                    }`}>
                      <Clock className="w-3 h-3" /> {meeting.Duration} mins
                    </span>
                  </div>

                  <h4 className={`font-bold text-xs line-clamp-2 ${isSelected ? 'text-[#FAF6EE]' : 'text-[#2C221E]'}`}>
                    {meeting.Meeting_Title}
                  </h4>
                  <p className={`text-[10px] mt-1 ${isSelected ? 'text-[#D9CFC0]' : 'text-[#8C7A6B]'}`}>
                    {meeting.Meeting_Date} • Status: <span className="text-[#3B7A57] font-semibold">Processed</span>
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Meeting Deep-Dive */}
        <div className="lg:col-span-8 space-y-6">
          {currentMeeting && (
            <div className="clay-card p-6 space-y-5">
              
              {/* Meeting Banner Header */}
              <div className="border-b border-[#E8DFC8] pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#EFE4D2] text-[#B88037] text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Session #{currentMeeting.Meeting_ID}
                    </span>
                    <span className="text-xs text-[#8C7A6B] font-medium">{currentMeeting.Meeting_Date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#2C221E]">
                    {currentMeeting.Meeting_Title}
                  </h3>
                </div>

                {/* Sub-tab Switcher */}
                <div className="flex items-center gap-1 bg-[#F5EFE4] p-1 rounded-xl border border-[#E6DCCB]">
                  {(['summary', 'transcript', 'actions'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                        activeSubTab === tab
                          ? 'bg-[#2C221E] text-white shadow-sm'
                          : 'text-[#6E615A] hover:text-[#2C221E]'
                      }`}
                    >
                      {tab === 'actions' ? 'Action Items' : tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub-tab 1: AI Executive Summary & Key Takeaways */}
              {activeSubTab === 'summary' && currentMeeting.Transcript && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-2xl bg-[#FAF4EA] border border-[#E6DCCB] space-y-2">
                    <h4 className="text-xs font-bold text-[#B88037] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#D49B53]" /> AI Executive Summary
                    </h4>
                    <p className="text-xs text-[#2C221E] leading-relaxed font-medium">
                      {currentMeeting.Transcript.Summary}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#2C221E] uppercase tracking-wider mb-2">
                      Key Discussion Takeaways:
                    </h4>
                    <ul className="space-y-2">
                      {currentMeeting.Transcript.KeyTakeaways?.map((kt, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-[#2C221E] font-medium bg-[#FFFDF9] p-3 rounded-xl border border-[#E8DFC8]">
                          <span className="w-5 h-5 rounded-full bg-[#EFE4D2] text-[#B88037] text-[10px] font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{kt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Sub-tab 2: Verbatim Transcript & Speakers */}
              {activeSubTab === 'transcript' && currentMeeting.Transcript && (
                <div className="space-y-4 animate-fade-in">
                  
                  {/* Speakers Timeline */}
                  {currentMeeting.Transcript.Speakers && (
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                      {currentMeeting.Transcript.Speakers.map((spk, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#FFFDF9] border border-[#E8DFC8] space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#D49B53] flex items-center gap-1">
                              <User className="w-3.5 h-3.5 text-[#B88037]" /> {spk.speaker}
                            </span>
                            <span className="font-mono text-[10px] text-[#8C7A6B] bg-[#F5EFE4] px-2 py-0.5 rounded">
                              {spk.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-[#2C221E] font-medium">{spk.text}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Full Text View */}
                  <div className="p-4 rounded-xl bg-[#F5EFE4] border border-[#E6DCCB] space-y-2">
                    <span className="text-[10px] font-bold text-[#8C7A6B] uppercase tracking-wider block">
                      Verbatim Speech Output:
                    </span>
                    <p className="text-xs text-[#2C221E] font-mono whitespace-pre-line leading-relaxed">
                      {currentMeeting.Transcript.Transcript_Text}
                    </p>
                  </div>
                </div>
              )}

              {/* Sub-tab 3: Interactive Action Items */}
              {activeSubTab === 'actions' && currentMeeting.Transcript && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-[#2C221E]">
                      Extracted Action Items & Deliverables ({currentMeeting.Transcript.ActionItems.length})
                    </h4>
                  </div>

                  <div className="space-y-2">
                    {currentMeeting.Transcript.ActionItems.map((act) => {
                      const isDone = act.status === 'completed';
                      return (
                        <div
                          key={act.id}
                          onClick={() => onToggleActionItem(currentMeeting.Meeting_ID, act.id)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isDone
                              ? 'bg-[#E2EFE7] border-[#B2D8C3] text-[#2C221E]'
                              : 'bg-[#FFFDF9] border-[#E8DFC8] hover:border-[#D49B53]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <button className="text-[#D49B53] focus:outline-none">
                              {isDone ? <CheckSquare className="w-5 h-5 text-[#3B7A57]" /> : <Square className="w-5 h-5 text-[#8C7A6B]" />}
                            </button>
                            <div>
                              <p className={`text-xs font-bold ${isDone ? 'line-through text-[#6E615A]' : 'text-[#2C221E]'}`}>
                                {act.task}
                              </p>
                              <p className="text-[10px] text-[#8C7A6B] font-medium mt-0.5">
                                Assignee: <span className="font-semibold text-[#2C221E]">{act.assignee}</span> • Due: {act.deadline}
                              </p>
                            </div>
                          </div>

                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                            isDone ? 'bg-[#3B7A57] text-white' : 'bg-[#EFE4D2] text-[#B88037]'
                          }`}>
                            {act.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>

    </div>
  );
};
