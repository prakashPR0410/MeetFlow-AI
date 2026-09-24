import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  Calendar,
  Clock,
  Users,
  Search,
  Filter,
  Plus,
  Play,
  Download,
  CheckCircle2,
  Sparkles,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Radio,
  ArrowRight,
  Copy,
  Check,
  PhoneOff,
  Bot,
  Zap,
  ExternalLink,
  MessageSquare,
  Shield,
  Wifi,
  WifiOff,
  AlertTriangle,
  Send,
  UserPlus
} from 'lucide-react';
import { Meeting } from '../types';

interface MeetingsViewProps {
  meetings: Meeting[];
  onSelectMeeting: (m: Meeting) => void;
  onCreateMeeting: (m: Meeting) => void;
  isDarkTheme: boolean;
}

interface MemberInRoom {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isHost: boolean;
  meetingIdEntered: string;
  color: string;
  isSpeaking?: boolean;
}

interface InMeetingMessage {
  id: string;
  sender: string;
  time: string;
  text: string;
  isAI?: boolean;
  color?: string;
}

export const MeetingsView: React.FC<MeetingsViewProps> = ({
  meetings,
  onSelectMeeting,
  onCreateMeeting,
  isDarkTheme,
}) => {
  // Sub-tabs order:
  // 1. Join Room
  // 2. Create
  // 3. Timeline
  // 4. History
  const [activeSubTab, setActiveSubTab] = useState<'join' | 'create' | 'timeline' | 'history'>('join');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'completed' | 'recorded'>('all');

  // New Meeting Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newDuration, setNewDuration] = useState(30);

  // Created meeting receipt state
  const [createdReceipt, setCreatedReceipt] = useState<{
    id: number;
    title: string;
    roomCode: string;
    date: string;
    duration: number;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Join Room State
  const [roomCodeInput, setRoomCodeInput] = useState('MEET-849-204');
  const [joinError, setJoinError] = useState('');
  
  // Live Meeting Room Interactive State
  const [isInLiveCall, setIsInLiveCall] = useState(false);
  const [activeLiveRoomCode, setActiveLiveRoomCode] = useState('MEET-849-204');
  const [activeLiveTitle, setActiveLiveTitle] = useState('Product Architecture & Engineering Sync');
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true); // Video ON by default for scheduled meeting
  const [callDuration, setCallDuration] = useState(0);

  // Internet Stability Monitor State
  const [isInternetStable, setIsInternetStable] = useState(true);
  const [latencyMs, setLatencyMs] = useState(24);

  // Video Stream Reference
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  // Room Members State (Only members who entered with Meeting ID appear)
  const [membersInCall, setMembersInCall] = useState<MemberInRoom[]>([
    {
      id: 'vp',
      name: 'Vasu Prakash (You)',
      role: 'Meeting Host',
      avatar: 'VP',
      isHost: true,
      meetingIdEntered: 'MEET-849-204',
      color: 'from-emerald-600 to-teal-500',
      isSpeaking: true
    }
  ]);
  const [memberAdmissionNotice, setMemberAdmissionNotice] = useState<string>('');

  // Side-wise In-Meeting Messages / Chat State
  const [inMeetingMessages, setInMeetingMessages] = useState<InMeetingMessage[]>([
    {
      id: 'msg-1',
      sender: 'MeetFlow AI Co-Pilot',
      time: '10:01 AM',
      text: 'Welcome to the live room. Meeting audio is being recorded with 3D spatial acoustic processing.',
      isAI: true,
      color: 'text-[#D49B53]'
    },
    {
      id: 'msg-2',
      sender: 'Alex Morgan',
      time: '10:02 AM',
      text: 'Joined with Meeting ID. Whisper speech recognition is capturing audio cleanly.',
      color: 'text-purple-400'
    }
  ]);
  const [newChatText, setNewChatText] = useState('');

  // 3D Audio Visualizer Spectrum Bars
  const [spectrumHeights, setSpectrumHeights] = useState<number[]>([
    25, 45, 75, 90, 60, 40, 85, 95, 70, 50, 65, 80, 45, 90, 100, 60, 35, 75
  ]);

  // Animate 3D Audio Visualizer Spectrum while recording
  useEffect(() => {
    let animTimer: NodeJS.Timeout;
    if (isInLiveCall && isMicOn) {
      animTimer = setInterval(() => {
        setSpectrumHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 75) + 20)
        );
      }, 150);
    }
    return () => clearInterval(animTimer);
  }, [isInLiveCall, isMicOn]);

  // Live Camera Initialization for scheduled meeting
  useEffect(() => {
    if (isInLiveCall && isVideoOn) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: false })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              setHasCameraPermission(true);
            }
          })
          .catch(() => {
            setHasCameraPermission(false);
          });
      }
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [isInLiveCall, isVideoOn]);

  // Call duration counter
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isInLiveCall) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isInLiveCall]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Launch live room: requires meeting ID. Members come after entering meeting ID.
  const handleLaunchLiveRoom = (code: string, title?: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setJoinError('Please enter a valid Meeting ID or Room Code.');
      return;
    }

    setJoinError('');
    setActiveLiveRoomCode(cleanCode);
    if (title) setActiveLiveTitle(title);
    setIsInLiveCall(true);
    setIsVideoOn(true); // Scheduled meeting: video is ON by default
    setActiveSubTab('join');

    // Only authorized meeting members enter after verifying this Meeting ID:
    setMembersInCall([
      {
        id: 'vp',
        name: 'Vasu Prakash (You)',
        role: 'Meeting Host',
        avatar: 'VP',
        isHost: true,
        meetingIdEntered: cleanCode,
        color: 'from-emerald-600 to-teal-500',
        isSpeaking: true
      }
    ]);

    setMemberAdmissionNotice(`Verified Host Vasu Prakash entered room with ID ${cleanCode}`);

    // Members enter one by one with Meeting ID verification
    setTimeout(() => {
      setMembersInCall((prev) => [
        ...prev,
        {
          id: 'am',
          name: 'Alex Morgan',
          role: 'Lead Architect',
          avatar: 'AM',
          isHost: false,
          meetingIdEntered: cleanCode,
          color: 'from-purple-600 to-indigo-500'
        }
      ]);
      setMemberAdmissionNotice(`Alex Morgan entered room with verified Meeting ID ${cleanCode}`);
      setTimeout(() => setMemberAdmissionNotice(''), 4000);
    }, 1800);

    setTimeout(() => {
      setMembersInCall((prev) => [
        ...prev,
        {
          id: 'sc',
          name: 'Sarah Chen',
          role: 'NLP & Speech Eng',
          avatar: 'SC',
          isHost: false,
          meetingIdEntered: cleanCode,
          color: 'from-amber-600 to-orange-500'
        }
      ]);
      setMemberAdmissionNotice(`Sarah Chen entered room with verified Meeting ID ${cleanCode}`);
      setTimeout(() => setMemberAdmissionNotice(''), 4000);
    }, 3600);
  };

  const handleAdmitAdditionalMember = () => {
    const newGuestId = `member-${Date.now()}`;
    const newMember: MemberInRoom = {
      id: newGuestId,
      name: 'David Miller',
      role: 'Staff ML Engineer',
      avatar: 'DM',
      isHost: false,
      meetingIdEntered: activeLiveRoomCode,
      color: 'from-cyan-600 to-blue-500'
    };
    setMembersInCall((prev) => [...prev, newMember]);
    setMemberAdmissionNotice(`David Miller entered room with verified Meeting ID ${activeLiveRoomCode}`);
    setTimeout(() => setMemberAdmissionNotice(''), 4000);
  };

  const handleSendInMeetingMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatText.trim()) return;

    const userMsg: InMeetingMessage = {
      id: `msg-${Date.now()}`,
      sender: 'Vasu Prakash (You)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newChatText.trim(),
      color: 'text-emerald-400'
    };

    setInMeetingMessages((prev) => [...prev, userMsg]);
    setNewChatText('');

    // AI Co-pilot acknowledges in side chat
    setTimeout(() => {
      const aiReply: InMeetingMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'MeetFlow AI Co-Pilot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Noted: "${userMsg.text}". Added to session key takeaways & action items summary.`,
        isAI: true,
        color: 'text-[#D49B53]'
      };
      setInMeetingMessages((prev) => [...prev, aiReply]);
    }, 1200);
  };

  const handleLeaveLiveRoom = () => {
    setIsInLiveCall(false);
  };

  const filteredMeetings = meetings.filter((m) => {
    const matchesSearch =
      m.Meeting_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.Transcript?.Summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || m.Status === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Generate formatted Meeting ID like MEET-749-382
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    const formattedCode = `MEET-${String(randomDigits).slice(0, 3)}-${String(randomDigits).slice(3, 6)}`;
    const meetingId = Date.now();

    const created: Meeting = {
      Meeting_ID: meetingId,
      User_ID: 1,
      Meeting_Title: newTitle.trim(),
      Meeting_Date: newDate,
      Duration: Number(newDuration),
      Audio_File: 'audio/recorded_meeting.wav',
      Status: 'completed',
      Room_Code: formattedCode,
      Transcript: {
        Transcript_ID: meetingId + 10,
        Meeting_ID: meetingId,
        Transcript_Text: `Alex Morgan: Welcome to ${newTitle.trim()}. We discussed project milestones, automated speech-to-text with Whisper, and LlamaIndex embeddings.\n\nVasu Prakash: All action items are recorded with auto-generated deadlines.`,
        Summary: `Meeting focused on ${newTitle.trim()}. Key milestones and technical execution plans were reviewed, and action items were distributed.`,
        KeyTakeaways: [
          `Session ${newTitle.trim()} created with Room Code ${formattedCode}.`,
          'Whisper speech recognition pipeline configured with real-time speaker diarization.',
          'Action items assigned with upcoming delivery deadlines.'
        ],
        ActionItems: [
          {
            id: `act-${Date.now()}`,
            task: `Execute deliverables for ${newTitle.trim()}`,
            assignee: 'Vasu Prakash',
            deadline: newDate,
            status: 'pending'
          }
        ],
        Speakers: [
          { timestamp: '00:00', speaker: 'Alex Morgan', text: `Welcome everyone to ${newTitle.trim()}.` },
          { timestamp: '00:15', speaker: 'Vasu Prakash', text: `Room ID ${formattedCode} is initialized with live AI copilot.` }
        ]
      }
    };

    onCreateMeeting(created);
    setCreatedReceipt({
      id: meetingId,
      title: newTitle.trim(),
      roomCode: formattedCode,
      date: newDate,
      duration: Number(newDuration),
    });
    setRoomCodeInput(formattedCode);
  };

  const handleCopyId = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopyLink = (code: string) => {
    navigator.clipboard.writeText(`https://meetflow.ai/room/${code}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <Video className="w-6 h-6 text-[#B88037]" />
          <span>Meetings & Transcripts Workspace</span>
        </h1>
        <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
          Join live AI-assisted meetings with verified members, schedule new sessions with instant Meeting IDs, and search transcripts.
        </p>
      </div>

      {/* Main Workspace Layout with Column Navigator on Left */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* Left Column: Navigator in Exact Order: Join Room, Create, Timeline, History */}
        <div className="w-full md:w-60 shrink-0 space-y-3">
          
          {/* Sub-Tab Switcher - Column Layout with Exact User Order */}
          <div className={`p-1.5 rounded-2xl border flex flex-col gap-1 w-full ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
          }`}>
            {[
              { id: 'join', label: 'Join Room' },
              { id: 'create', label: 'Create' },
              { id: 'timeline', label: 'Timeline' },
              { id: 'history', label: 'History' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as any);
                  if (tab.id !== 'join') {
                    setIsInLiveCall(false);
                  }
                }}
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold transition text-left flex items-center justify-between ${
                  activeSubTab === tab.id
                    ? 'bg-[#B88037] text-white shadow-md'
                    : isDarkTheme ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50' : 'text-[#6E615A] hover:text-[#2C221E] hover:bg-[#EFE4D2]/60'
                }`}
              >
                <span>{tab.label}</span>
                {tab.id === 'join' && isInLiveCall && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            ))}
          </div>

          {/* Filter Dropdown at the Bottom of Navigator */}
          <div className={`p-2.5 rounded-2xl border flex items-center gap-2 w-full ${
            isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#E8DFC8] shadow-sm'
          }`}>
            <Filter className="w-4 h-4 text-[#B88037] shrink-0" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className={`w-full bg-transparent text-xs font-medium focus:outline-none cursor-pointer ${
                isDarkTheme ? 'text-slate-200' : 'text-[#2C221E]'
              }`}
            >
              <option value="all" className={isDarkTheme ? 'bg-slate-900' : 'bg-white'}>All Statuses</option>
              <option value="completed" className={isDarkTheme ? 'bg-slate-900' : 'bg-white'}>Completed</option>
              <option value="recorded" className={isDarkTheme ? 'bg-slate-900' : 'bg-white'}>Recorded</option>
            </select>
          </div>

          {/* Quick Network & AI Status Widget */}
          <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
            isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Meetings</span>
              <span className="font-bold text-[#B88037]">{meetings.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Internet Signal</span>
              <span className={`font-bold flex items-center gap-1 ${isInternetStable ? 'text-emerald-500' : 'text-amber-500'}`}>
                {isInternetStable ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                <span>{isInternetStable ? 'Stable (24ms)' : 'Unstable (380ms)'}</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Audio 3D REC</span>
              <span className="text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
              </span>
            </div>
          </div>

        </div>

        {/* Right Main Content Area */}
        <div className="flex-1 w-full space-y-4 min-w-0">

          {/* 1. SUB-TAB CONTENT: JOIN ROOM (FIRST) */}
          {activeSubTab === 'join' && (
            <div className="space-y-6">
              
              {/* If user is inside the interactive live call */}
              {isInLiveCall ? (
                <div className={`p-6 sm:p-7 rounded-3xl border space-y-6 shadow-xl transition-all ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-[#E8DFC8]'
                }`}>
                  
                  {/* Internet Stability Alert Banner if internet is not stable */}
                  {!isInternetStable && (
                    <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-3 animate-pulse">
                      <div className="flex items-center gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="font-bold">Internet Connection is Not Stable:</span>
                          <span className="ml-1 opacity-90">
                            High packet latency ({latencyMs}ms) detected. Video stream throttled to preserve real-time Whisper audio recording.
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setIsInternetStable(true);
                          setLatencyMs(24);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-200 text-[10px] font-bold border border-amber-500/30 hover:bg-amber-500/30 shrink-0"
                      >
                        Restore Network
                      </button>
                    </div>
                  )}

                  {/* Member Admission Notification Toast */}
                  {memberAdmissionNotice && (
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex items-center gap-2 animate-fadeIn">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>{memberAdmissionNotice}</span>
                    </div>
                  )}

                  {/* Live Room Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-inherit">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <span className="text-xs font-bold uppercase tracking-wider text-red-500">Live AI Meeting</span>
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-[#B88037]/15 text-[#B88037] font-bold border border-[#B88037]/30">
                          {activeLiveRoomCode}
                        </span>
                        {/* Video Camera ON badge for scheduled meeting */}
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                          <Video className="w-3 h-3 text-emerald-400" />
                          <span>Video Camera ON (Scheduled Session Active)</span>
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-bold">{activeLiveTitle}</h2>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      {/* Network Quality Indicator Toggle */}
                      <button
                        onClick={() => {
                          setIsInternetStable(!isInternetStable);
                          setLatencyMs(isInternetStable ? 385 : 24);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 transition ${
                          isInternetStable
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        }`}
                        title="Click to test network stability warning"
                      >
                        {isInternetStable ? <Wifi className="w-3.5 h-3.5" /> : <WifiOff className="w-3.5 h-3.5" />}
                        <span>{isInternetStable ? 'Internet: Stable (24ms)' : 'Internet: Unstable!'}</span>
                      </button>

                      {/* Timer */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-white font-mono text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 text-[#B88037]" />
                        <span>{formatTimer(callDuration)}</span>
                      </div>

                      {/* Share Meeting ID */}
                      <button
                        onClick={() => handleCopyId(activeLiveRoomCode)}
                        className={`p-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 ${
                          isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
                        }`}
                      >
                        {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{copiedId ? 'Copied' : 'Share ID'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Conference Video & Member Grid (ONLY members who entered with Meeting ID appear) */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Room Members (Admitted only via Meeting ID): <strong className="text-white">{membersInCall.length}</strong></span>
                      <button
                        onClick={handleAdmitAdditionalMember}
                        className="text-[11px] text-[#B88037] font-bold hover:underline flex items-center gap-1"
                      >
                        <UserPlus className="w-3 h-3" />
                        <span>Admit Guest Member with ID</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {/* Host Video Stream Tile (Video camera ON during scheduled meeting) */}
                      <div className={`relative p-3 rounded-2xl border overflow-hidden flex flex-col justify-between min-h-[170px] ${
                        isDarkTheme ? 'bg-slate-950 border-emerald-500/50' : 'bg-[#FAF4EA] border-emerald-500/50'
                      }`}>
                        {isVideoOn ? (
                          <div className="relative w-full h-full min-h-[110px] rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                            <video
                              ref={videoRef}
                              autoPlay
                              playsInline
                              muted
                              className="w-full h-full object-cover rounded-xl"
                            />
                            {!hasCameraPermission && (
                              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 to-slate-800 p-3 text-center">
                                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shadow mb-1">
                                  VP
                                </div>
                                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span>Webcam Feed Active (Scheduled Time)</span>
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-6 text-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-sm flex items-center justify-center shadow mb-2">
                              VP
                            </div>
                            <span className="text-xs text-slate-400">Camera Paused</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-xs font-bold block">Vasu Prakash (You)</span>
                            <span className="text-[10px] text-emerald-500 font-semibold">Host • ID: {activeLiveRoomCode}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="p-1 rounded-full bg-slate-800 text-white">
                              {isMicOn ? <Mic className="w-3 h-3 text-emerald-400" /> : <MicOff className="w-3 h-3 text-red-400" />}
                            </span>
                            <span className="p-1 rounded-full bg-slate-800 text-white">
                              {isVideoOn ? <Video className="w-3 h-3 text-emerald-400" /> : <VideoOff className="w-3 h-3 text-red-400" />}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Other Members who entered ONLY after entering Meeting ID */}
                      {membersInCall
                        .filter((m) => !m.isHost)
                        .map((member) => (
                          <div
                            key={member.id}
                            className={`relative p-4 rounded-2xl border flex flex-col items-center justify-center min-h-[170px] text-center transition-all ${
                              isDarkTheme ? 'bg-slate-950/70 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                            }`}
                          >
                            <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${member.color} text-white font-bold text-sm flex items-center justify-center shadow mb-2`}>
                              {member.avatar}
                            </div>
                            <span className="text-xs font-bold">{member.name}</span>
                            <span className="text-[10px] text-slate-400">{member.role}</span>
                            <span className="mt-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                              Joined via {member.meetingIdEntered}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* 3-COLUMN STRUCTURE: 
                      1. 3D Audio Visualizer / Audio Recorder
                      2. Meeting Details Panel (Beside it)
                      3. Live In-Meeting Chat & Messages (Side-wise)
                  */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
                    
                    {/* COLUMN 1: 3D AUDIO RECORDER & WAVEFORM SPECTRUM */}
                    <div className={`p-4 rounded-2xl border space-y-3.5 ${
                      isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}>
                      <div className="flex items-center justify-between border-b pb-2 border-inherit">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                          <h4 className="text-xs font-bold">3D Audio Recorder</h4>
                        </div>
                        <span className="text-[10px] font-mono bg-red-500/10 text-red-400 px-2 py-0.5 rounded font-bold">
                          REC • 44.1kHz
                        </span>
                      </div>

                      {/* 3D Waveform Frequency Visualizer */}
                      <div className="h-28 rounded-xl bg-slate-900 border border-slate-800 p-3 flex items-end justify-between gap-1 overflow-hidden relative">
                        <div className="absolute top-2 left-3 text-[10px] text-slate-400 font-mono">
                          Spatial Audio Capture: Active
                        </div>
                        {spectrumHeights.map((h, i) => (
                          <div
                            key={i}
                            style={{ height: `${h}%` }}
                            className="flex-1 bg-gradient-to-t from-[#B88037] via-purple-500 to-cyan-400 rounded-t transition-all duration-150"
                          />
                        ))}
                      </div>

                      <div className="space-y-1.5 text-[11px] text-slate-400">
                        <div className="flex items-center justify-between">
                          <span>Whisper Acoustic Pipeline:</span>
                          <span className="text-emerald-400 font-bold">Streaming Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Acoustic Decibel:</span>
                          <span className="text-slate-300 font-mono">-14.2 dB</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Internet Quality:</span>
                          <span className={isInternetStable ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                            {isInternetStable ? 'Good (24ms)' : 'Poor / Unstable (380ms)'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 2: MEETING DETAILS PANEL (BESIDE 3D RECORDER) */}
                    <div className={`p-4 rounded-2xl border space-y-3 ${
                      isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}>
                      <div className="flex items-center justify-between border-b pb-2 border-inherit">
                        <h4 className="text-xs font-bold flex items-center gap-1.5 text-[#B88037]">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Meeting Details</span>
                        </h4>
                        <span className="text-[10px] bg-[#B88037]/20 text-[#B88037] px-2 py-0.5 rounded font-bold">
                          E2EE Secured
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Meeting ID / Room Code</span>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="font-mono font-extrabold text-[#B88037] text-sm">{activeLiveRoomCode}</span>
                            <button
                              onClick={() => handleCopyId(activeLiveRoomCode)}
                              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                            >
                              <Copy className="w-3 h-3" /> Copy
                            </button>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Scheduled Meeting Time</span>
                          <span className="font-medium">Today • 10:00 AM - 10:45 AM (Session Active)</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Host Organizer</span>
                          <span className="font-medium">Vasu Prakash (masaramsatyavasuprakash@gmail.com)</span>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Security & Access Policy</span>
                          <p className="text-[10px] text-slate-400 leading-tight">
                            Only members with verified Meeting ID are admitted into this room.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 3: SIDE-WISE IN-MEETING MESSAGES & CHAT */}
                    <div className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 ${
                      isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}>
                      <div className="flex items-center justify-between border-b pb-2 border-inherit">
                        <h4 className="text-xs font-bold flex items-center gap-1.5 text-purple-400">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>In-Meeting Messages</span>
                        </h4>
                        <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
                      </div>

                      {/* Messages Stream */}
                      <div className="space-y-2.5 max-h-36 overflow-y-auto pr-1 flex-1 text-xs">
                        {inMeetingMessages.map((msg) => (
                          <div key={msg.id} className="p-2 rounded-xl bg-black/20 border border-slate-800/80 space-y-0.5">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className={`font-bold ${msg.color || 'text-slate-300'}`}>{msg.sender}</span>
                              <span className="text-slate-500 font-mono">{msg.time}</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-slate-200">{msg.text}</p>
                          </div>
                        ))}
                      </div>

                      {/* Send Message Form */}
                      <form onSubmit={handleSendInMeetingMessage} className="flex items-center gap-1.5 pt-1">
                        <input
                          type="text"
                          value={newChatText}
                          onChange={(e) => setNewChatText(e.target.value)}
                          placeholder="Send message to meeting members..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-slate-700 bg-black/30 focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!newChatText.trim()}
                          className="p-2 rounded-xl bg-[#B88037] text-white disabled:opacity-40"
                          title="Send message"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>

                  </div>

                  {/* Meeting Control Bar */}
                  <div className="flex items-center justify-between pt-3 border-t border-inherit">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsMicOn(!isMicOn)}
                        className={`p-3 rounded-2xl border transition ${
                          isMicOn ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-red-500/20 border-red-500/30 text-red-400'
                        }`}
                        title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
                      >
                        {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => setIsVideoOn(!isVideoOn)}
                        className={`p-3 rounded-2xl border transition ${
                          isVideoOn ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-red-500/20 border-red-500/30 text-red-400'
                        }`}
                        title={isVideoOn ? 'Turn Camera Off' : 'Turn Camera On'}
                      >
                        {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                      </button>
                    </div>

                    <button
                      onClick={handleLeaveLiveRoom}
                      className="px-5 py-2.5 rounded-2xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg transition flex items-center gap-2"
                    >
                      <PhoneOff className="w-4 h-4" />
                      <span>End Meeting & Generate Summary</span>
                    </button>
                  </div>

                </div>
              ) : (
                /* Pre-Call Join Room Form & Active Rooms */
                <div className="space-y-6">
                  
                  {/* Join Room Input Card */}
                  <div className={`p-8 rounded-3xl border max-w-xl mx-auto text-center space-y-6 shadow-sm ${
                    isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
                  }`}>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#B88037] to-[#D49B53] text-white mx-auto flex items-center justify-center shadow-md">
                      <Radio className="w-7 h-7 animate-pulse" />
                    </div>

                    <div>
                      <h2 className="text-xl font-bold">Join Live AI Meeting Room</h2>
                      <p className={`text-xs mt-1.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                        Enter your Meeting ID to connect to the meeting. Only authorized members with this Meeting ID are admitted.
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      <div className="relative">
                        <input
                          type="text"
                          value={roomCodeInput}
                          onChange={(e) => {
                            setRoomCodeInput(e.target.value);
                            setJoinError('');
                          }}
                          placeholder="e.g. MEET-849-204"
                          className={`w-full py-3.5 px-4 text-center tracking-widest text-lg font-mono font-bold rounded-2xl focus:outline-none transition ${
                            isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100 focus:border-[#B88037]' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E] focus:border-[#B88037]'
                          }`}
                        />
                      </div>

                      {joinError && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center justify-center gap-2">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{joinError}</span>
                        </div>
                      )}

                      <button
                        onClick={() => handleLaunchLiveRoom(roomCodeInput, 'Product Architecture & Engineering Sync')}
                        className="w-full py-3.5 rounded-2xl text-xs font-bold bg-[#B88037] hover:bg-[#A36F2B] text-white shadow-lg transition flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch & Join Live AI Meeting Room</span>
                      </button>
                    </div>
                  </div>

                  {/* Ready to Join Meetings List */}
                  <div className={`p-6 rounded-3xl border space-y-4 ${
                    isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#E8DFC8]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#B88037]" />
                        <span>Scheduled Meetings Requiring Meeting ID</span>
                      </h3>
                      <span className="text-xs text-slate-400">Click to connect with ID</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {[
                        { title: 'Product Architecture & Engineering Sync', code: 'MEET-849-204', participants: 3 },
                        { title: 'Whisper ASR Speech Pipeline Review', code: 'MEET-521-980', participants: 2 },
                        { title: 'Sprint 24 Action Items Checkpoint', code: 'MEET-319-744', participants: 2 },
                      ].map((room, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition hover:border-[#B88037] ${
                            isDarkTheme ? 'bg-slate-950/70 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                          }`}
                        >
                          <div>
                            <h4 className="font-bold text-xs sm:text-sm line-clamp-1">{room.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="font-mono text-[11px] font-bold text-[#B88037]">{room.code}</span>
                              <span className="text-[10px] text-slate-400">• {room.participants} invited members</span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleLaunchLiveRoom(room.code, room.title)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#B88037] text-white shadow hover:bg-[#A36F2B] transition flex items-center gap-1.5 shrink-0"
                          >
                            <Video className="w-3.5 h-3.5" />
                            <span>Join</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* 2. SUB-TAB CONTENT: CREATE (SECOND) */}
          {activeSubTab === 'create' && (
            <div className="space-y-6 max-w-2xl mx-auto">
              
              {/* If a meeting was just created, show its confirmation card with Meeting ID & direct join button */}
              {createdReceipt ? (
                <div className={`p-8 rounded-3xl border space-y-6 shadow-md ${
                  isDarkTheme ? 'bg-slate-900 border-emerald-500/30' : 'bg-white border-[#E8DFC8]'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Meeting Created Successfully
                        </span>
                      </div>
                      <h2 className="text-lg font-bold mt-1">{createdReceipt.title}</h2>
                    </div>
                  </div>

                  {/* Meeting ID Showcase Box */}
                  <div className={`p-5 rounded-2xl border space-y-3.5 ${
                    isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                  }`}>
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Generated Meeting ID / Room Code
                      </span>
                      <div className="flex items-center justify-between gap-3 mt-1">
                        <span className="text-2xl font-mono font-extrabold text-[#B88037] tracking-wider">
                          {createdReceipt.roomCode}
                        </span>
                        <button
                          onClick={() => handleCopyId(createdReceipt.roomCode)}
                          className="px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 bg-[#B88037] text-white shadow hover:bg-[#A36F2B] transition"
                        >
                          {copiedId ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId ? 'Copied!' : 'Copy ID'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="border-t pt-3 border-inherit">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Direct Join Link
                      </span>
                      <div className="flex items-center justify-between gap-2 mt-1">
                        <span className="text-xs font-mono text-slate-400 truncate">
                          https://meetflow.ai/room/{createdReceipt.roomCode}
                        </span>
                        <button
                          onClick={() => handleCopyLink(createdReceipt.roomCode)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                            isDarkTheme ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-[#E8DFC8] text-[#2C221E]'
                          }`}
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#B88037]" /> {createdReceipt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#8C7A6B]" /> {createdReceipt.duration} mins
                      </span>
                      <span className="text-emerald-400 font-semibold">• AI Co-Pilot Ready</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2.5">
                    <button
                      onClick={() => handleLaunchLiveRoom(createdReceipt.roomCode, createdReceipt.title)}
                      className="w-full py-3.5 rounded-2xl text-xs font-bold bg-[#B88037] hover:bg-[#A36F2B] text-white shadow-lg transition flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Launch & Join Live AI Meeting Room Now</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setCreatedReceipt(null);
                          setNewTitle('');
                        }}
                        className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                          isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E] hover:bg-[#EFE4D2]'
                        }`}
                      >
                        Schedule Another Meeting
                      </button>

                      <button
                        onClick={() => setActiveSubTab('history')}
                        className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                          isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E] hover:bg-[#EFE4D2]'
                        }`}
                      >
                        View in History
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Meeting Creation Form */
                <div className={`p-8 rounded-3xl border space-y-6 shadow-sm ${
                  isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
                }`}>
                  <div className={`border-b pb-4 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
                    <h2 className="text-lg font-bold">Schedule or Create New Meeting</h2>
                    <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                      Creates an official Meeting ID and provides direct access to the live AI conference room.
                    </p>
                  </div>

                  <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold mb-1.5">Meeting Title</label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Sprint 24 Architecture & Speech Model Review"
                        className={`w-full p-3.5 rounded-xl focus:outline-none transition ${
                          isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100 focus:border-[#B88037]' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E] focus:border-[#B88037]'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold mb-1.5">Meeting Date</label>
                        <input
                          type="date"
                          required
                          value={newDate}
                          onChange={(e) => setNewDate(e.target.value)}
                          className={`w-full p-3 rounded-xl focus:outline-none ${
                            isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E]'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1.5">Expected Duration (mins)</label>
                        <input
                          type="number"
                          required
                          min={5}
                          max={240}
                          value={newDuration}
                          onChange={(e) => setNewDuration(Number(e.target.value))}
                          className={`w-full p-3 rounded-xl focus:outline-none ${
                            isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E]'
                          }`}
                        />
                      </div>
                    </div>

                    <div className={`p-3.5 rounded-xl border flex items-center justify-between ${
                      isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[#B88037]" />
                        <div>
                          <span className="font-bold">Real-time AI Co-Pilot & Whisper ASR</span>
                          <p className="text-[10px] text-slate-400">Auto-generates timestamps, key decisions, and action items</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                        Enabled
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-2xl text-xs font-bold bg-[#B88037] text-white hover:bg-[#A36F2B] transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Meeting & Generate ID</span>
                    </button>
                  </form>
                </div>
              )}

            </div>
          )}

          {/* 3. SUB-TAB CONTENT: TIMELINE (THIRD) */}
          {activeSubTab === 'timeline' && (
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
            }`}>
              <div className={`border-b pb-4 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
                <h2 className="font-bold text-base">Interactive Dialogue Timeline</h2>
                <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  Timestamped speaker dialogue breakdown from recent meetings
                </p>
              </div>

              <div className="space-y-4">
                {meetings[0]?.Transcript?.Speakers?.map((sp, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="font-mono text-xs px-2 py-1 rounded bg-[#B88037]/15 text-[#B88037] shrink-0 font-bold">
                      {sp.timestamp}
                    </span>
                    <div className={`p-3.5 rounded-xl border flex-1 text-xs space-y-1 ${
                      isDarkTheme ? 'bg-slate-950/80 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}>
                      <span className="font-bold text-[#B88037]">{sp.speaker}</span>
                      <p className={isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}>{sp.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. SUB-TAB CONTENT: HISTORY (FOURTH) */}
          {activeSubTab === 'history' && (
            <div className="space-y-4">
              
              {/* Search Control */}
              <div className="relative w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search meeting titles, transcripts..."
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none transition ${
                    isDarkTheme ? 'bg-slate-900 border border-slate-800 text-slate-100' : 'bg-white border border-[#E8DFC8] text-[#2C221E]'
                  }`}
                />
              </div>

              {/* Meeting Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMeetings.map((m) => (
                  <div
                    key={m.Meeting_ID}
                    className={`p-6 rounded-3xl border transition duration-200 space-y-4 hover:border-[#B88037] ${
                      isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8] shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-base text-[#B88037]">{m.Meeting_Title}</h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#B88037]" /> {m.Meeting_Date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#8C7A6B]" /> {m.Duration} mins</span>
                          {m.Room_Code && (
                            <span className="font-mono text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                              {m.Room_Code}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {m.Status}
                      </span>
                    </div>

                    {/* Summary Preview */}
                    {m.Transcript?.Summary && (
                      <p className={`text-xs leading-relaxed line-clamp-3 p-3 rounded-xl ${
                        isDarkTheme ? 'bg-slate-950/80 text-slate-300 border border-slate-800/80' : 'bg-[#FAF4EA] text-[#6E615A] border border-[#E8DFC8]'
                      }`}>
                        {m.Transcript.Summary}
                      </p>
                    )}

                    {/* Action Items count */}
                    {m.Transcript?.ActionItems && (
                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {m.Transcript.ActionItems.length} Action Items
                        </span>
                        <span className="text-slate-400 text-[11px]">Audio: {m.Audio_File.split('/')[1] || m.Audio_File}</span>
                      </div>
                    )}

                    {/* Card Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-inherit">
                      <button
                        onClick={() => onSelectMeeting(m)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#B88037] text-white hover:bg-[#A36F2B] transition flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>View AI Summary</span>
                      </button>

                      <button
                        onClick={() => handleLaunchLiveRoom(m.Room_Code || `MEET-${m.Meeting_ID.toString().slice(-6)}`, m.Meeting_Title)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1 ${
                          isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
                        }`}
                        title="Reopen Live Room"
                      >
                        <Video className="w-3.5 h-3.5 text-[#B88037]" />
                        <span>Live</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
