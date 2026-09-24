import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  Bell,
  Moon,
  Sun,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  Video,
  Upload,
  MessageSquare,
  FileText,
  Settings,
  HelpCircle,
  LogIn,
  Download
} from 'lucide-react';
import { DownloadAppModal } from './DownloadAppModal';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isDarkTheme: boolean;
  setIsDarkTheme: (dark: boolean) => void;
  userName: string;
  onSignOut: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  isDarkTheme,
  setIsDarkTheme,
  userName,
  onSignOut,
  onOpenAuth,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 px-4 lg:px-8 py-3 ${
      isDarkTheme
        ? 'bg-[#0F0E17]/85 border-slate-800/80 text-slate-100'
        : 'bg-[#FAF6EE]/90 border-[#E8DFC8] text-[#2C221E]'
    }`}>
      <div className="w-full px-2 sm:px-4 flex items-center justify-between gap-4">
        
        {/* Brand & Identity */}
        <div className="flex items-center gap-6">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className={`w-10 h-10 rounded-2xl p-0.5 shadow-md flex items-center justify-center transform group-hover:scale-105 transition ${
              isDarkTheme
                ? 'bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400'
                : 'bg-gradient-to-tr from-[#D49B53] to-[#B88037]'
            }`}>
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                isDarkTheme ? 'bg-[#0F0E17]' : 'bg-[#FAF4EA]'
              }`}>
                <Sparkles className={`w-5 h-5 ${isDarkTheme ? 'text-purple-400' : 'text-[#B88037]'}`} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`font-extrabold text-base tracking-tight ${
                  isDarkTheme
                    ? 'bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent'
                    : 'text-[#2C221E]'
                }`}>
                  MeetFlow AI
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border hidden sm:inline-block ${
                  isDarkTheme ? 'bg-purple-500/10 text-purple-300 border-purple-500/20' : 'bg-[#EFE4D2] text-[#B88037] border-[#DFD3C0]'
                }`}>
                  PRO
                </span>
              </div>
              <p className={`text-[10px] font-medium hidden sm:block ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                CSE Project • AI Meeting Intelligence
              </p>
            </div>
          </div>

          {/* Top Quick Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-bold">
            {[
              { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
              { id: 'summary', label: 'Summary', icon: Sparkles },
              { id: 'transcripts', label: 'History', icon: Video },
              { id: 'reports', label: 'PDF Generator', icon: FileText },
              { id: 'settings', label: 'Settings & Profile', icon: Settings },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                  activeTab === nav.id
                    ? isDarkTheme ? 'bg-purple-600 text-white shadow' : 'bg-[#D49B53] text-white shadow'
                    : isDarkTheme ? 'text-slate-300 hover:bg-slate-800' : 'text-[#6E615A] hover:bg-[#EFE4D2]'
                }`}
              >
                <nav.icon className="w-3.5 h-3.5" />
                <span>{nav.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs hidden md:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7A6B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcripts, decisions..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium focus:outline-none transition ${
              isDarkTheme
                ? 'bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-purple-500/50'
                : 'bg-white border border-[#E8DFC8] text-[#2C221E] placeholder-[#8C7A6B] focus:ring-2 focus:ring-[#D49B53]/50 shadow-inner'
            }`}
          />
        </div>

        {/* Right Tools & User Profile */}
        <div className="flex items-center gap-2.5">
          
          {/* Download App on Mobile Phone & PC Button */}
          <button
            onClick={() => setShowDownloadModal(true)}
            title="Download App on Mobile Phone & PC"
            className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition shadow-sm ${
              isDarkTheme
                ? 'bg-gradient-to-r from-[#B88037]/20 to-purple-600/20 border-[#B88037]/40 text-[#D49B53] hover:bg-[#B88037]/30'
                : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#B88037] hover:bg-[#EFE4D2]'
            }`}
          >
            <Download className="w-4 h-4 text-[#B88037]" />
            <span className="hidden sm:inline">Download App</span>
          </button>

          {/* Theme Switcher Button */}
          <button
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            title="Toggle Visual Theme"
            className={`p-2.5 rounded-xl border transition ${
              isDarkTheme
                ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
                : 'bg-white border-[#E8DFC8] text-[#2C221E] hover:bg-[#FAF4EA]'
            }`}
          >
            {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications Drawer Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2.5 rounded-xl border relative transition ${
                isDarkTheme
                  ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                  : 'bg-white border-[#E8DFC8] text-[#2C221E] hover:bg-[#FAF4EA]'
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#D49B53] absolute top-2 right-2 ring-2 ring-[#FAF6EE]" />
            </button>

            {showNotifications && (
              <div className={`absolute right-0 mt-2 w-72 rounded-2xl border p-4 shadow-2xl z-50 text-xs space-y-3 ${
                isDarkTheme ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-[#FAF6EE] border-[#E8DFC8] text-[#2C221E]'
              }`}>
                <div className={`font-bold flex justify-between items-center border-b pb-2 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
                  <span>AI Notifications</span>
                  <span className="text-[10px] text-[#B88037] font-bold">2 New</span>
                </div>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-[#EFE4D2] border border-[#DFD3C0]">
                    <p className="font-bold text-[#2C221E]">Whisper Transcript Ready</p>
                    <p className="text-[11px] text-[#6E615A]">Meeting 101 AI summary and action items generated.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <p className="font-bold text-emerald-800">Action Item Reminder</p>
                    <p className="text-[11px] text-[#6E615A]">2 deadlines due by Friday.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`flex items-center gap-2 p-1.5 rounded-xl border transition ${
                isDarkTheme
                  ? 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                  : 'bg-white border-[#E8DFC8] hover:bg-[#FAF4EA]'
              }`}
            >
              <div className="w-7 h-7 rounded-lg bg-[#D49B53] text-white font-bold text-xs flex items-center justify-center shadow">
                {userName.charAt(0)}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>{userName.split(' ')[0]}</span>
              <ChevronDown className={`w-3.5 h-3.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'}`} />
            </button>

            {showProfileMenu && (
              <div className={`absolute right-0 mt-2 w-52 rounded-2xl border p-2 shadow-2xl z-50 text-xs space-y-1 ${
                isDarkTheme ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-[#FAF6EE] border-[#E8DFC8] text-[#2C221E]'
              }`}>
                <div className={`px-3 py-2 border-b ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
                  <p className="font-bold truncate">{userName}</p>
                  <p className="text-[10px] text-[#B88037] font-bold">Pro User</p>
                </div>

                <button
                  onClick={() => { setActiveTab('settings'); setShowProfileMenu(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl font-semibold flex items-center gap-2 ${
                    isDarkTheme ? 'hover:bg-slate-800 hover:text-purple-300' : 'hover:bg-[#EFE4D2] hover:text-[#B88037]'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Profile & Settings</span>
                </button>

                <div className={`border-t pt-1 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
                  <button
                    onClick={() => { onSignOut(); setShowProfileMenu(false); }}
                    className="w-full text-left px-3 py-2 rounded-xl hover:bg-rose-500/10 text-rose-600 font-bold flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Download / Install App Modal for Mobile Phone & PC */}
      <DownloadAppModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        isDarkTheme={isDarkTheme}
      />
    </header>
  );
};
