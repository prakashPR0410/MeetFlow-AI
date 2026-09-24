import React, { useState } from 'react';
import {
  Upload,
  FileAudio,
  FileVideo,
  CheckCircle2,
  Sparkles,
  Zap,
  Play,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Meeting } from '../types';

interface UploadRecordingViewProps {
  onMeetingUploaded: (meeting: Meeting) => void;
  isDarkTheme: boolean;
}

export const UploadRecordingView: React.FC<UploadRecordingViewProps> = ({
  onMeetingUploaded,
  isDarkTheme,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulatedUpload = (file: File) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setUploadProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        setUploadProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
          try {
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
        }, 500);
      } else {
        setUploadProgress(current);
      }
    }, 250);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleSimulatedUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSimulatedUpload(e.target.files[0]);
    }
  };

  const handleViewSummary = () => {
    const newMeeting: Meeting = {
      Meeting_ID: Date.now(),
      User_ID: 24,
      Meeting_Title: uploadedFile ? uploadedFile.name.replace(/\.[^/.]+$/, '') : 'Uploaded Meeting Recording',
      Meeting_Date: new Date().toISOString().split('T')[0],
      Duration: 35,
      Audio_File: uploadedFile ? uploadedFile.name : 'uploaded_audio.mp3',
      Status: 'completed',
      Transcript: {
        Transcript_ID: Date.now() + 1,
        Meeting_ID: Date.now(),
        Transcript_Text: `Speaker A: Welcome to the uploaded recording review.
Speaker B: We verified the audio transcription accuracy using OpenAI Whisper ASR.
Speaker C: Summaries and vector embeddings were computed automatically.`,
        Summary: `AI successfully analyzed ${uploadedFile?.name || 'the uploaded recording'}. Key findings and assigned tasks were synthesized into vector embeddings.`,
        KeyTakeaways: [
          'Uploaded media file transcribed via Whisper ASR.',
          'Key discussion points mapped to vector store.',
          'PDF report ready for download.'
        ],
        ActionItems: [
          {
            id: `act-${Date.now()}`,
            task: 'Review uploaded audio takeaways with project leads',
            assignee: 'Alex Morgan',
            deadline: new Date().toISOString().split('T')[0],
            status: 'pending'
          }
        ]
      }
    };

    onMeetingUploaded(newMeeting);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-purple-500/20 bg-purple-500/10 text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Whisper ASR Media Uploader</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Upload Meeting Audio or Video Recording
        </h1>
        <p className={`text-xs max-w-lg mx-auto ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
          Supports MP3, WAV, M4A, MP4, WEBM, and TXT files. AI will automatically transcribe speech, extract key takeaways, and update action items.
        </p>
      </div>

      {/* Drag and Drop Container */}
      {!isSuccess ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`p-10 rounded-3xl border-2 border-dashed text-center transition-all duration-300 relative overflow-hidden ${
            isDragging
              ? 'border-purple-500 bg-purple-500/10 scale-[1.01]'
              : isDarkTheme
                ? 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40'
                : 'bg-white border-[#E8DFC8] hover:border-[#D49B53]'
          }`}
        >
          {!isProcessing ? (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center transform hover:scale-110 transition">
                <Upload className="w-8 h-8" />
              </div>

              <div>
                <h3 className="font-bold text-base">Drag and drop your recording file here</h3>
                <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  or click to browse files from your computer (Up to 500 MB)
                </p>
              </div>

              <input
                type="file"
                id="file-upload-input"
                accept="audio/*,video/*,.txt,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />

              <label
                htmlFor="file-upload-input"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-lg cursor-pointer transition transform hover:-translate-y-0.5"
              >
                <Zap className="w-4 h-4" />
                <span>Select File from Device</span>
              </label>

              <div className="pt-4 flex items-center justify-center gap-6 text-[11px] text-slate-500">
                <span className="flex items-center gap-1"><FileAudio className="w-3.5 h-3.5" /> MP3, WAV, M4A</span>
                <span className="flex items-center gap-1"><FileVideo className="w-3.5 h-3.5" /> MP4, WEBM</span>
              </div>
            </div>
          ) : (
            /* Upload & AI Processing State */
            <div className="space-y-6 py-6">
              <div className="w-12 h-12 rounded-full border-4 border-purple-500/20 border-t-purple-500 mx-auto animate-spin" />

              <div>
                <h3 className="font-bold text-sm">Processing Audio with OpenAI Whisper...</h3>
                <p className="text-xs text-slate-400 mt-1">{uploadedFile?.name}</p>
              </div>

              {/* Progress Bar */}
              <div className="max-w-md mx-auto space-y-2">
                <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Extracting speech vectors...</span>
                  <span>{uploadProgress}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Success State */
        <div className={`p-8 rounded-3xl border text-center space-y-6 ${
          isDarkTheme ? 'bg-slate-900/80 border-purple-500/40' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-xl font-bold">Upload & AI Processing Complete!</h2>
            <p className="text-xs text-slate-400 mt-1">
              File <span className="font-bold text-purple-300">{uploadedFile?.name}</span> was successfully transcribed and indexed into the vector store.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleViewSummary}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition shadow-lg flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>View Generated AI Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => { setIsSuccess(false); setUploadedFile(null); }}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-semibold border transition flex items-center justify-center gap-2 ${
                isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E]'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Upload Another File</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
