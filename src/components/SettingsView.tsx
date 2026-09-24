import React, { useState } from 'react';
import {
  User,
  Shield,
  Palette,
  Bell,
  Link,
  HelpCircle,
  Sparkles,
  CheckCircle2,
  Lock,
  Moon,
  Sun,
  Laptop,
  Check,
  Zap,
  BookOpen,
  Play,
  FileText,
  Mic,
  Download
} from 'lucide-react';

interface SettingsViewProps {
  isDarkTheme: boolean;
  setIsDarkTheme: (dark: boolean) => void;
  userName: string;
  userEmail: string;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkTheme,
  setIsDarkTheme,
  userName,
  userEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'appearance' | 'connected'>('profile');
  const [nameInput, setNameInput] = useState(userName || 'Alex Morgan');
  const [emailInput, setEmailInput] = useState(userEmail || 'alex.morgan@meetflow.ai');
  const [roleInput, setRoleInput] = useState('Lead Systems Architect');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Settings Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
            <User className="w-6 h-6 text-purple-400" />
            <span>Settings & System Preferences</span>
          </h1>
          <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
            Manage your account profile, theme preferences, and connected SaaS tools.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className={`p-1 rounded-2xl border flex items-center gap-1 ${
          isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
        }`}>
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'appearance', label: 'Appearance' },
            { id: 'connected', label: 'Connected Apps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow'
                  : isDarkTheme ? 'text-slate-400 hover:text-slate-200' : 'text-[#6E615A] hover:text-[#2C221E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <div className={`p-8 rounded-3xl border max-w-2xl mx-auto space-y-6 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div className="flex items-center gap-4 pb-6 border-b ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
              {nameInput.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold">{nameInput}</h2>
              <p className="text-xs text-purple-400 font-semibold">{roleInput}</p>
              <p className="text-xs text-slate-400">{emailInput}</p>
            </div>
          </div>

          {saveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Profile settings updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold mb-1.5">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className={`w-full p-3 rounded-xl focus:outline-none ${
                  isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E]'
                }`}
              />
            </div>

            <div>
              <label className="block font-bold mb-1.5">Work Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className={`w-full p-3 rounded-xl focus:outline-none ${
                  isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E]'
                }`}
              />
            </div>

            <div>
              <label className="block font-bold mb-1.5">Role / Designation</label>
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                className={`w-full p-3 rounded-xl focus:outline-none ${
                  isDarkTheme ? 'bg-slate-950 border border-slate-800 text-slate-100' : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E]'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 transition shadow-md"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* APPEARANCE TAB */}
      {activeTab === 'appearance' && (
        <div className={`p-8 rounded-3xl border max-w-2xl mx-auto space-y-6 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Palette className="w-5 h-5 text-purple-400" />
              <span>Theme & Visual Styling</span>
            </h2>
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              Switch between Dark Glassmorphism SaaS and Luxury Cream 3D theme.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => setIsDarkTheme(true)}
              className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col items-center text-center space-y-3 ${
                isDarkTheme
                  ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/50'
                  : 'bg-slate-900 text-white border-slate-800'
              }`}
            >
              <Moon className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="font-bold text-sm">Dark Glassmorphism</h3>
                <p className="text-[11px] text-slate-400">Futuristic purple & cyan glow accents</p>
              </div>
            </div>

            <div
              onClick={() => setIsDarkTheme(false)}
              className={`p-5 rounded-2xl border cursor-pointer transition flex flex-col items-center text-center space-y-3 ${
                !isDarkTheme
                  ? 'bg-[#FAF4EA] border-[#D49B53] ring-2 ring-[#D49B53]/50 text-[#2C221E]'
                  : 'bg-white text-slate-900 border-slate-200'
              }`}
            >
              <Sun className="w-8 h-8 text-[#B88037]" />
              <div>
                <h3 className="font-bold text-sm">Luxury Warm Cream</h3>
                <p className="text-[11px] text-[#6E615A]">3D tactile golden clay aesthetic</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONNECTED APPS TAB */}
      {activeTab === 'connected' && (
        <div className={`p-8 rounded-3xl border max-w-2xl mx-auto space-y-6 ${
          isDarkTheme ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
        }`}>
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Link className="w-5 h-5 text-indigo-400" />
              <span>Connected SaaS Integrations</span>
            </h2>
            <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              Google & GitHub OAuth synchronized with meeting transcripts & developer repositories.
            </p>
          </div>

          <div className="space-y-4">
            {/* Google Workspace Integration */}
            <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border shadow-sm flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm">Google Workspace & Calendar</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Connected ✓
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Account: <span className="font-mono text-emerald-400 font-semibold">{userEmail || 'masaramsatyavasuprakash@gmail.com'}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Syncs Google Meet recordings, Google Calendar events, and auto-transcribes meetings.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => alert('Google Calendar & Meet synchronization refreshed!')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#B88037] text-white shadow hover:bg-[#A36F2B] transition"
                >
                  Sync Now
                </button>
              </div>
            </div>

            {/* GitHub Integration */}
            <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white shadow-sm flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-xs sm:text-sm">GitHub Repository & Developer Sync</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Connected ✓
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Repository: <span className="font-mono text-purple-400 font-semibold">vasuprakash/meetflow-ai-rag</span>
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Auto-commits meeting summaries as Markdown docs & creates GitHub Issues for action items.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => alert('GitHub repository issues & action items synchronized!')}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#B88037] text-white shadow hover:bg-[#A36F2B] transition"
                >
                  Sync Issues
                </button>
              </div>
            </div>

            {/* Other tools: Teams, Slack */}
            {[
              { name: 'Microsoft Teams', desc: 'Import Teams recorded audio & video streams', connected: true },
              { name: 'Slack Workspace', desc: 'Send summary & action items directly to sprint channels', connected: true },
            ].map((app, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                }`}
              >
                <div>
                  <h4 className="font-bold text-xs">{app.name}</h4>
                  <p className="text-[11px] text-slate-400">{app.desc}</p>
                </div>

                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Connected
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
