import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SidebarNav } from './components/SidebarNav';
import { LandingPage } from './components/LandingPage';
import { AuthView } from './components/AuthView';
import { DashboardView } from './components/DashboardView';
import { MeetingsView } from './components/MeetingsView';
import { UploadRecordingView } from './components/UploadRecordingView';
import { AISummaryView } from './components/AISummaryView';
import { AIChatAssistant } from './components/AIChatAssistant';
import { VectorExplorer3D } from './components/VectorExplorer3D';
import { MeetingRecorder } from './components/MeetingRecorder';
import { PythonCodeStudio } from './components/PythonCodeStudio';
import { PDFReportGenerator } from './components/PDFReportGenerator';
import { ArchitectureView } from './components/ArchitectureView';
import { SettingsView } from './components/SettingsView';

import { INITIAL_MEETINGS, INITIAL_DOCUMENTS } from './data/initialData';
import { Meeting, DocumentFile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('auth');
  const [meetings, setMeetings] = useState<Meeting[]>(INITIAL_MEETINGS);
  const [documents, setDocuments] = useState<DocumentFile[]>(INITIAL_DOCUMENTS);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(INITIAL_MEETINGS[0]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    const saved = localStorage.getItem('meetflow_theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('meetflow_theme', isDarkTheme ? 'dark' : 'light');
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const [user, setUser] = useState<{ name: string; email: string } | null>({
    name: 'Alex Morgan',
    email: 'alex.morgan@meetflow.ai'
  });

  // Handle new meeting created
  const handleMeetingCreated = (newMeeting: Meeting) => {
    setMeetings((prev) => [newMeeting, ...prev]);
    setSelectedMeeting(newMeeting);
    setActiveTab('summary');
  };

  // Handle document upload
  const handleUploadDocument = (newDoc: DocumentFile) => {
    setDocuments((prev) => [newDoc, ...prev]);
  };

  // Handle Action Item toggle
  const handleToggleActionItem = (meetingId: number, actionId: string) => {
    setMeetings((prev) =>
      prev.map((m) => {
        if (m.Meeting_ID !== meetingId || !m.Transcript) return m;
        const updatedActions = m.Transcript.ActionItems.map((act) => {
          if (act.id !== actionId) return act;
          const newStatus = act.status === 'completed' ? 'pending' : 'completed';
          return { ...act, status: newStatus as any };
        });
        const updatedMeeting = {
          ...m,
          Transcript: {
            ...m.Transcript,
            ActionItems: updatedActions,
          },
        };
        if (selectedMeeting?.Meeting_ID === meetingId) {
          setSelectedMeeting(updatedMeeting);
        }
        return updatedMeeting;
      })
    );
  };

  const handleSelectMeeting = (m: Meeting) => {
    setSelectedMeeting(m);
    setActiveTab('summary');
  };

  const handleLoginSuccess = (userData: { name: string; email: string }) => {
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleSignOut = () => {
    setUser(null);
    setActiveTab('auth');
  };

  const allChunks = documents.flatMap((d) => d.Chunks);

  // LANDING PAGE VIEW
  if (activeTab === 'landing') {
    return (
      <LandingPage
        onSignIn={() => setActiveTab('auth')}
        onSignUp={() => setActiveTab('auth')}
        onLaunchDemo={() => setActiveTab('dashboard')}
        isDarkTheme={isDarkTheme}
      />
    );
  }

  // AUTHENTICATION VIEW (PAGE 1)
  if (activeTab === 'auth') {
    return (
      <AuthView
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setActiveTab('dashboard')}
        isDarkTheme={isDarkTheme}
      />
    );
  }

  // MAIN DASHBOARD & APPLICATION WORKSPACE
  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 pb-6 ${
      isDarkTheme
        ? 'bg-[#0B0A10] text-slate-100 selection:bg-purple-500 selection:text-white'
        : 'bg-[#FAF6EE] text-[#2C221E] selection:bg-[#D49B53] selection:text-white'
    }`}>
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDarkTheme={isDarkTheme}
        setIsDarkTheme={setIsDarkTheme}
        userName={user?.name || 'Alex Morgan'}
        onSignOut={handleSignOut}
        onOpenAuth={() => setActiveTab('auth')}
      />

      {/* Main Workspace Layout */}
      <div className="w-full px-4 sm:px-6 lg:px-6 py-6 flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Left Navigation Sidebar */}
        <SidebarNav activeTab={activeTab} setActiveTab={setActiveTab} isDarkTheme={isDarkTheme} userName={user?.name || 'Alex Morgan'} />

        {/* Center Workspace Content */}
        <main className="flex-1 min-w-0 space-y-6">
          
          {activeTab === 'dashboard' && (
            <DashboardView
              meetings={meetings}
              onNavigate={setActiveTab}
              onSelectMeeting={handleSelectMeeting}
              isDarkTheme={isDarkTheme}
              userName={user?.name?.split(' ')[0] || 'Alex'}
            />
          )}

          {activeTab === 'transcripts' && (
            <MeetingsView
              meetings={meetings}
              onSelectMeeting={handleSelectMeeting}
              onCreateMeeting={handleMeetingCreated}
              isDarkTheme={isDarkTheme}
            />
          )}

          {activeTab === 'upload' && (
            <UploadRecordingView
              onMeetingUploaded={handleMeetingCreated}
              isDarkTheme={isDarkTheme}
            />
          )}

          {activeTab === 'summary' && (
            <AISummaryView
              meeting={selectedMeeting}
              onToggleActionItem={handleToggleActionItem}
              onOpenPDFGenerator={() => setActiveTab('reports')}
              onOpenAIChat={() => setActiveTab('chat')}
              isDarkTheme={isDarkTheme}
            />
          )}

          {activeTab === 'recorder' && (
            <MeetingRecorder onMeetingCreated={handleMeetingCreated} isDarkTheme={isDarkTheme} />
          )}

          {activeTab === 'chat' && (
            <AIChatAssistant vectorChunks={allChunks} isDarkTheme={isDarkTheme} />
          )}

          {activeTab === 'vectors' && (
            <VectorExplorer3D
              documents={documents}
              onUploadDocument={handleUploadDocument}
              isDarkTheme={isDarkTheme}
            />
          )}

          {activeTab === 'python' && <PythonCodeStudio isDarkTheme={isDarkTheme} />}

          {activeTab === 'reports' && (
            <PDFReportGenerator meetings={meetings} isDarkTheme={isDarkTheme} />
          )}

          {activeTab === 'architecture' && <ArchitectureView isDarkTheme={isDarkTheme} />}

          {activeTab === 'settings' && (
            <SettingsView
              isDarkTheme={isDarkTheme}
              setIsDarkTheme={setIsDarkTheme}
              userName={user?.name || 'Alex Morgan'}
              userEmail={user?.email || 'alex.morgan@meetflow.ai'}
            />
          )}

        </main>

      </div>

      {/* Footer */}
      <footer className={`border-t py-4 text-center text-xs transition-colors ${
        isDarkTheme
          ? 'border-slate-800 bg-[#07060A] text-slate-500'
          : 'border-[#E8DFC8] bg-[#F5EFE4] text-[#6E615A]'
      }`}>
        <div className="w-full px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold">MeetFlow AI • Enterprise Speech Intelligence & RAG Platform</span>
          <span className="font-bold text-[#B88037]">Production Edition • 2026</span>
        </div>
      </footer>

    </div>
  );
}
