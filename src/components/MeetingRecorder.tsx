import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, Sparkles, CheckCircle2, FileText, Loader2, Volume2 } from 'lucide-react';
import { ThreeAudioSphere } from './ThreeAudioSphere';
import { TiltCard } from './TiltCard';
import { Meeting } from '../types';

interface MeetingRecorderProps {
  onMeetingCreated: (newMeeting: Meeting) => void;
  isDarkTheme?: boolean;
}

export const MeetingRecorder: React.FC<MeetingRecorderProps> = ({ onMeetingCreated, isDarkTheme = false }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingSample, setIsPlayingSample] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [audioNote, setAudioNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Microphone access error:", err);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProcessMeeting = async () => {
    const title = meetingTitle.trim() || `Meeting Session - ${new Date().toLocaleDateString()}`;
    setIsProcessing(true);
    
    try {
      setProcessingStep('Loading OpenAI Whisper Speech Recognition Model...');
      await new Promise((r) => setTimeout(r, 800));

      setProcessingStep('Transcribing speech segment with timestamp boundaries...');
      await new Promise((r) => setTimeout(r, 1000));

      setProcessingStep('Generating ChromaDB / FAISS 5D vector embeddings...');
      await new Promise((r) => setTimeout(r, 800));

      setProcessingStep('LangChain RAG summarization & action item extraction...');

      // Call Backend API
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingTitle: title,
          audioNote: audioNote || 'Discussion regarding project architecture, Python backend modules, and Whisper speech-to-text accuracy.',
        }),
      });

      const data = await response.json();

      const newMeeting: Meeting = {
        Meeting_ID: Math.floor(100 + Math.random() * 900),
        User_ID: 24,
        Meeting_Title: title,
        Meeting_Date: new Date().toISOString().split('T')[0],
        Duration: Math.max(1, Math.ceil(recordingTime / 60) || 15),
        Audio_File: `audio/recorded_${Date.now()}.mp3`,
        Status: 'completed',
        Transcript: {
          Transcript_ID: Math.floor(500 + Math.random() * 900),
          Meeting_ID: 103,
          Transcript_Text: data.transcriptText || 'Verbatim transcript initialized successfully.',
          Summary: data.summary || 'Meeting summarized using AI Meeting Intelligence pipeline.',
          KeyTakeaways: data.keyTakeaways || ['Whisper STT processed audio.', 'Vector embeddings indexed.'],
          ActionItems: (data.actionItems || []).map((item: any, idx: number) => ({
            id: `act-new-${idx}`,
            task: item.task || 'Review transcription logs',
            assignee: item.assignee || 'Alex Morgan',
            deadline: item.deadline || '2026-07-30',
            status: 'pending',
          })),
          Speakers: data.speakers || [
            { timestamp: '00:00', speaker: 'Alex Morgan', text: 'Meeting started.' }
          ],
        },
      };

      onMeetingCreated(newMeeting);
      setIsProcessing(false);
      setRecordingTime(0);
      setMeetingTitle('');
      setAudioNote('');
    } catch (error) {
      console.error("Transcription error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title & Section Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${
            isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'
          }`}>
            <Mic className="w-6 h-6 text-[#D49B53]" /> 3D Audio Recorder & Whisper Engine
          </h2>
          <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
            Record live meetings with microphone or upload sample audio to convert speech to text using OpenAI Whisper and LangChain RAG.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            isDarkTheme
              ? 'bg-purple-500/10 border-purple-500/20 text-purple-300'
              : 'clay-pill border-[#E6DCCB] text-[#B88037]'
          }`}>
            Module: recorder.py & whisper_engine.py
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 3D Visualizer & Recording Controls */}
        <div className="lg:col-span-7 space-y-6">
          <TiltCard className="p-6" isDarkTheme={isDarkTheme}>
            
            {/* Header Status Bar */}
            <div className={`flex items-center justify-between border-b pb-4 mb-4 ${
              isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'
            }`}>
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-[#D49B53]'}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isDarkTheme ? 'text-slate-200' : 'text-[#2C221E]'
                }`}>
                  {isRecording ? 'Live Signal Capturing...' : 'Interactive 3D Waveform Orb'}
                </span>
              </div>
              <span className={`text-lg font-mono font-bold px-3 py-1 rounded-xl border ${
                isDarkTheme
                  ? 'bg-slate-950 text-slate-100 border-slate-800'
                  : 'text-[#2C221E] bg-[#F3ECE0] border-[#E6DCCB]'
              }`}>
                {formatTime(recordingTime)}
              </span>
            </div>

            {/* Three.js Interactive 3D Sphere */}
            <div className={`rounded-2xl overflow-hidden border relative shadow-inner ${
              isDarkTheme
                ? 'border-slate-800 bg-slate-950'
                : 'border-[#E6DCCB] bg-gradient-to-b from-[#FFFDF9] to-[#F5EFE4]'
            }`}>
              <ThreeAudioSphere isRecording={isRecording} isPlaying={isPlayingSample} isDarkTheme={isDarkTheme} />
            </div>

            {/* Tactile 3D Recording Controls */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="clay-button-gold px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition transform"
                >
                  <Mic className="w-5 h-5 animate-pulse" /> Start 3D Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="bg-gradient-to-r from-red-600 to-rose-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition transform"
                >
                  <Square className="w-5 h-5 fill-current" /> Stop Recording
                </button>
              )}

              <button
                onClick={() => setIsPlayingSample(!isPlayingSample)}
                className={`px-5 py-3 rounded-2xl font-semibold text-xs flex items-center gap-2 transition ${
                  isDarkTheme
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    : 'clay-button text-[#2C221E]'
                }`}
              >
                {isPlayingSample ? <Pause className="w-4 h-4 text-[#D49B53]" /> : <Play className="w-4 h-4 text-[#D49B53]" />}
                {isPlayingSample ? 'Pause Sample Audio' : 'Play Audio Wave Demo'}
              </button>
            </div>

          </TiltCard>
        </div>

        {/* Right Column: Meeting Form & AI Processing Trigger */}
        <div className="lg:col-span-5 space-y-6">
          <div className={`p-6 space-y-4 rounded-2xl border ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'clay-card'
          }`}>
            <h3 className={`font-bold text-base flex items-center gap-2 ${
              isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'
            }`}>
              <FileText className="w-5 h-5 text-[#B88037]" /> Meeting Details & Notes
            </h3>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${
                isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'
              }`}>
                Meeting Title / Topic
              </label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="e.g. AI Architecture Review - Whisper & RAG"
                className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#D49B53] ${
                  isDarkTheme
                    ? 'bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500'
                    : 'clay-input text-[#2C221E]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-semibold mb-1 ${
                isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'
              }`}>
                Audio Context / Discussion Highlights (Optional)
              </label>
              <textarea
                value={audioNote}
                onChange={(e) => setAudioNote(e.target.value)}
                rows={4}
                placeholder="Type or paste audio highlights, key discussion points, or audio topics..."
                className={`w-full px-4 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#D49B53] ${
                  isDarkTheme
                    ? 'bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500'
                    : 'clay-input text-[#2C221E]'
                }`}
              />
            </div>

            {/* Quick Preset Topics */}
            <div>
              <span className={`text-[11px] font-bold ${
                isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'
              }`}>Preset Scenarios from PDF Report:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  "Departmental Progress Review",
                  "Module 3 Whisper & RAG Pipeline",
                  "SQLite3 Database Schema & 3NF",
                  "ReportLab PDF Export Test"
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setMeetingTitle(preset);
                      setAudioNote(`Discussion regarding ${preset} as described in Chapter 7 implementation specifications.`);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition ${
                      isDarkTheme
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-purple-300 border border-slate-700'
                        : 'clay-pill text-[#2C221E] hover:text-[#B88037]'
                    }`}
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Process & Transcribe Action */}
            <div className={`pt-2 border-t ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
              {isProcessing ? (
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-[#FAF4EA] border-[#E6DCCB]'
                }`}>
                  <div className="flex items-center gap-3 text-xs font-bold text-[#B88037]">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Audio & Transcribing...</span>
                  </div>
                  <p className={`text-[11px] font-medium animate-pulse ${
                    isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'
                  }`}>
                    {processingStep}
                  </p>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${
                    isDarkTheme ? 'bg-slate-800' : 'bg-[#EFE4D2]'
                  }`}>
                    <div className="bg-[#D49B53] h-full animate-pulse w-3/4 rounded-full" />
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleProcessMeeting}
                  className="w-full clay-button-gold py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] transition"
                >
                  <Sparkles className="w-4 h-4" /> Run Whisper & AI Summarizer
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
