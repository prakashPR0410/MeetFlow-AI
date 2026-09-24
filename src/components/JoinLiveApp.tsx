import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Radio,
  PhoneOff,
  Users,
  Sparkles,
  MessageSquare,
  Share2,
  Settings,
  Shield,
  Clock,
  CheckCircle2,
  Plus,
  Play,
  Volume2,
  Bot,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Meeting } from '../types';

interface JoinLiveAppProps {
  onMeetingCreated: (m: Meeting) => void;
  isDarkTheme: boolean;
  onNavigateTab: (tab: string) => void;
}

export const JoinLiveApp: React.FC<JoinLiveAppProps> = ({
  onMeetingCreated,
  isDarkTheme,
  onNavigateTab,
}) => {
  const [inCall, setInCall] = useState(false);
  const [roomCode, setRoomCode] = useState('MEET-849-204');
  const [meetingTitle, setMeetingTitle] = useState('Product Architecture & Engineering Sync');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isCoPilotActive, setIsCoPilotActive] = useState(true);
  const [callDuration, setCallDuration] = useState(0);

  // Live Transcripts
  const [liveTranscripts, setLiveTranscripts] = useState<
    Array<{ speaker: string; text: string; time: string; color: string }>
  >([
    {
      speaker: 'Alex Morgan',
      text: 'Good morning team. Let’s review the Whisper speech recognition pipeline and LlamaIndex embeddings.',
      time: '00:03',
      color: 'text-purple-400',
    },
    {
      speaker: 'Sarah Chen',
      text: 'Whisper acoustic chunking is running at 98.2% word accuracy with zero lag on 5-second buffers.',
      time: '00:15',
      color: 'text-indigo-400',
    },
    {
      speaker: 'David Miller',
      text: 'FAISS vector search is returning top-3 semantic chunks in 1.4 seconds. Ready for staging deployment.',
      time: '00:28',
      color: 'text-cyan-400',
    },
  ]);

  // Live Extracted Action Items
  const [liveActionItems, setLiveActionItems] = useState<string[]>([
    'Verify Whisper speech recognition audio buffer latency',
    'Benchmark FAISS vector cosine similarity on 5,000 document chunks',
    'Compile executive PDF intelligence summary for sprint leads',
  ]);

  // Live AI Suggestions
  const [liveAiInsights, setLiveAiInsights] = useState<string[]>([
    'AI Note: Team has reached consensus on sub-2s RAG response latency.',
    'AI Recommendation: Add timestamped speakers to SQLite database before export.',
  ]);

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inCall) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [inCall]);

  const formatCallTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  const handleJoinCall = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) return;
    setInCall(true);
  };

  const handleEndCall = () => {
    // Generate meeting and dispatch
    const newMeeting: Meeting = {
      Meeting_ID: Date.now(),
      User_ID: 1,
      Meeting_Title: meetingTitle || `Live Room ${roomCode}`,
      Meeting_Date: new Date().toISOString().split('T')[0],
      Duration: Math.max(1, Math.ceil(callDuration / 60)),
      Audio_File: 'audio/live_session.wav',
      Status: 'completed',
      Transcript: {
        Transcript_ID: Date.now() + 50,
        Meeting_ID: Date.now(),
        Transcript_Text: liveTranscripts.map((t) => `${t.speaker}: ${t.text}`).join('\n'),
        Summary: `Live meeting in Room ${roomCode} synthesized with autonomous AI co-pilot. Team discussed Whisper ASR speech latency, FAISS vector embeddings, and verified executive PDF intelligence generation.`,
        KeyTakeaways: [
          'Whisper acoustic speech recognition achieved 98.2% transcription accuracy.',
          'FAISS vector search latency benchmarked at <1.8s for semantic context.',
          'Real-time action items indexed and ready for PDF export.',
        ],
        ActionItems: liveActionItems.map((act, i) => ({
          id: `live-act-${Date.now()}-${i}`,
          task: act,
          assignee: i === 0 ? 'Alex Morgan' : i === 1 ? 'David Miller' : 'Sarah Chen',
          deadline: new Date().toISOString().split('T')[0],
          status: 'pending',
        })),
        Speakers: liveTranscripts.map((t) => ({
          timestamp: t.time,
          speaker: t.speaker,
          text: t.text,
        })),
      },
    };

    onMeetingCreated(newMeeting);
    setInCall(false);
    onNavigateTab('summary');
  };

  // IF NOT IN CALL: ROOM JOIN LOBBY
  if (!inCall) {
    return (
      <div className="space-y-6 font-sans">
        
        {/* Lobby Header */}
        <div className={`p-8 rounded-3xl border ${
          isDarkTheme
            ? 'bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/40 border-purple-500/30'
            : 'bg-gradient-to-r from-[#FAF4EA] to-[#EFE4D2] border-[#E8DFC8]'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Live AI Meeting App
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Join Live Meeting Room
              </h1>
              <p className={`text-xs max-w-xl ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>
                Connect to live audio/video rooms equipped with real-time Whisper speech transcription, autonomous action item extraction, and live Gemini AI co-pilot.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border text-center space-y-1 ${
              isDarkTheme ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-[#E8DFC8]'
            }`}>
              <div className="text-xs font-bold text-purple-400">Audio STT Engine</div>
              <div className="text-lg font-extrabold text-emerald-400">Whisper ASR Live</div>
              <div className="text-[10px] text-slate-400">98.2% Word Precision</div>
            </div>
          </div>
        </div>

        {/* Join Form Card */}
        <div className="max-w-xl mx-auto">
          <div className={`p-8 rounded-3xl border shadow-xl space-y-6 ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E8DFC8]'
          }`}>
            <div className="text-center space-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center mb-3">
                <Radio className="w-7 h-7 animate-pulse" />
              </div>
              <h2 className="text-lg font-bold">Enter Meeting Credentials</h2>
              <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                Provide a room code or start an instant collaborative session
              </p>
            </div>

            <form onSubmit={handleJoinCall} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1.5">Meeting Agenda / Title</label>
                <input
                  type="text"
                  required
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="e.g. Q3 Sprint Planning & Architecture"
                  className={`w-full p-3.5 rounded-xl text-xs font-semibold focus:outline-none transition ${
                    isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5">Room ID or Link</label>
                <input
                  type="text"
                  required
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="MEET-849-204"
                  className={`w-full p-3.5 rounded-xl text-center text-sm font-mono font-bold tracking-wider focus:outline-none transition ${
                    isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E]'
                  }`}
                />
              </div>

              {/* Hardware Preview Controls */}
              <div className="flex items-center justify-center gap-4 py-2">
                <button
                  type="button"
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                    isMicOn
                      ? 'bg-purple-600/20 text-purple-300 border-purple-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span>{isMicOn ? 'Mic Active' : 'Mic Muted'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                    isVideoOn
                      ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                      : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}
                >
                  {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  <span>{isVideoOn ? 'Camera Active' : 'Camera Off'}</span>
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl hover:opacity-95 transition flex items-center justify-center gap-2 text-sm tracking-wide"
              >
                <Radio className="w-4 h-4 animate-pulse" />
                <span>Launch & Join Meeting Room</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    );
  }

  // ACTIVE IN-CALL WORKSPACE
  return (
    <div className="space-y-4 font-sans">
      
      {/* Active Call Header Bar */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 ${
        isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#E8DFC8]'
      }`}>
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
          <div>
            <h2 className="text-sm font-bold flex items-center gap-2">
              <span>{meetingTitle}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">
                {roomCode}
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>Call Duration: <b className="font-mono text-emerald-400">{formatCallTime(callDuration)}</b></span>
              <span>• 4 Participants</span>
            </p>
          </div>
        </div>

        {/* Live Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMicOn(!isMicOn)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              isMicOn
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
            title="Toggle Mic"
          >
            {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4 text-rose-400" />}
          </button>

          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              isVideoOn
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}
            title="Toggle Camera"
          >
            {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4 text-rose-400" />}
          </button>

          <button
            onClick={() => setIsCoPilotActive(!isCoPilotActive)}
            className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
              isCoPilotActive
                ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Co-Pilot</span>
          </button>

          <button
            onClick={handleEndCall}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-lg transition flex items-center gap-2"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End & Synthesize AI Report</span>
          </button>
        </div>
      </div>

      {/* Main Call View: Video Grid on Left + AI Co-Pilot on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left 2 Cols: Participant Video Tiles & Live Waveform */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* 4-Person Video / Audio Conference Grid */}
          <div className="grid grid-cols-2 gap-3 aspect-video sm:aspect-[16/9] min-h-[320px]">
            
            {/* Tile 1: You */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-purple-500/20">
                  AM
                </div>
                <div className="text-xs font-bold text-slate-200">You (Alex Morgan)</div>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Host</span>
                {isMicOn ? <Mic className="w-3 h-3 text-emerald-400" /> : <MicOff className="w-3 h-3 text-rose-400" />}
              </div>
            </div>

            {/* Tile 2: Sarah Chen */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-indigo-500/20">
                  SC
                </div>
                <div className="text-xs font-bold text-slate-200">Sarah Chen</div>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Audio ML</span>
                <Mic className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* Tile 3: David Miller */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-600 to-emerald-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-cyan-500/20">
                  DM
                </div>
                <div className="text-xs font-bold text-slate-200">David Miller</div>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>RAG Architect</span>
                <Mic className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

            {/* Tile 4: Marcus Vance */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-rose-600 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-lg ring-4 ring-amber-500/20">
                  MV
                </div>
                <div className="text-xs font-bold text-slate-200">Marcus Vance</div>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Design Lead</span>
                <Mic className="w-3 h-3 text-emerald-400" />
              </div>
            </div>

          </div>

          {/* Live Audio Waveform Stream */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
            isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
          }`}>
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-purple-400 animate-pulse" />
              <span className="text-xs font-bold">Live Whisper Acoustic Spectrum</span>
            </div>

            {/* Animated Audio Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-6">
              {[12, 24, 18, 28, 14, 26, 16, 22, 30, 20, 15, 27].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-indigo-400 animate-pulse"
                  style={{
                    height: `${h}px`,
                    animationDelay: `${i * 80}ms`,
                  }}
                />
              ))}
            </div>

            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              98.2% Accuracy
            </span>
          </div>

        </div>

        {/* Right Col: Real-Time AI Meeting Co-Pilot */}
        <div className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
          isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-inherit">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="font-bold text-xs">Autonomous AI Co-Pilot</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
                Live RAG
              </span>
            </div>

            {/* Live Detected Action Items */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Action Items Extracted ({liveActionItems.length})
              </span>
              <div className="space-y-1.5">
                {liveActionItems.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-[11px] leading-tight flex items-start gap-2 ${
                      isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Rolling Transcripts */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Speech Stream (Whisper ASR)
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {liveTranscripts.map((t, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-[11px] space-y-1 ${
                      isDarkTheme ? 'bg-slate-950/60 border-slate-800/60' : 'bg-white border-[#E8DFC8]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${t.color}`}>{t.speaker}</span>
                      <span className="text-[10px] font-mono text-slate-500">{t.time}</span>
                    </div>
                    <p className={`leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* End & Synthesize Button */}
          <button
            onClick={handleEndCall}
            className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg flex items-center justify-center gap-2 hover:opacity-95 transition"
          >
            <span>Finish Call & Open PDF Report</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
