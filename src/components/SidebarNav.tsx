import React, { useState } from 'react';
import {
  LayoutDashboard,
  Mic,
  Upload,
  MessageSquare,
  Video,
  Network,
  Download,
  Smartphone,
  Laptop
} from 'lucide-react';
import { DownloadAppModal } from './DownloadAppModal';

interface SidebarNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkTheme?: boolean;
  userName?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ activeTab, setActiveTab, isDarkTheme = false, userName = 'Alex Morgan' }) => {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const primaryNavItems = [
    { id: 'dashboard', label: 'Home Dashboard', icon: LayoutDashboard, badge: 'Main' },
    { id: 'recorder', label: 'Record Meeting', icon: Mic, badge: 'Audio' },
    { id: 'upload', label: 'Upload Recording', icon: Upload, badge: 'File' },
    { id: 'chat', label: 'Ask AI Chat', icon: MessageSquare, badge: 'RAG' },
    { id: 'transcripts', label: 'Join Live Meeting', icon: Video, badge: 'Live' },
  ];

  const initials = userName
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'AM';

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className={`p-4 space-y-3 sticky top-20 transition-colors duration-200 ${
        isDarkTheme
          ? 'bg-slate-900/90 border border-slate-800/80 shadow-xl rounded-2xl text-slate-100 backdrop-blur-md'
          : 'clay-card'
      }`}>
        
        {/* User Card */}
        <div className={`p-3.5 rounded-2xl border transition-colors ${
          isDarkTheme
            ? 'bg-slate-800/80 border-slate-700/80 shadow-sm'
            : 'bg-gradient-to-r from-[#F5EFE4] to-[#FAF4EA] border-[#E8DFC8] shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center shadow-inner ${
              isDarkTheme ? 'bg-purple-600 text-white' : 'bg-[#D49B53] text-white'
            }`}>
              {initials}
            </div>
            <div className="overflow-hidden">
              <h4 className={`text-xs font-bold truncate ${isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'}`}>{userName}</h4>
              <p className={`text-[10px] font-medium truncate ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>Lead Systems Architect</p>
            </div>
          </div>
        </div>

        <div className={`text-[11px] font-bold uppercase tracking-wider px-2 pt-1 ${
          isDarkTheme ? 'text-purple-400/90' : 'text-[#8C7A6B]'
        }`}>
          Core Navigation
        </div>

        {/* Primary Nav Items */}
        <nav className="space-y-1.5">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? isDarkTheme
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md transform translate-x-1'
                      : 'bg-gradient-to-r from-[#2C221E] to-[#40332D] text-[#FAF6EE] shadow-md transform translate-x-1'
                    : isDarkTheme
                      ? 'bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/40'
                      : 'clay-button text-[#2C221E] hover:text-[#B88037]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? (isDarkTheme ? 'text-white' : 'text-[#D49B53]') : (isDarkTheme ? 'text-purple-400' : 'text-[#8C7A6B]')}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? isDarkTheme ? 'bg-white/20 text-white' : 'bg-[#D49B53] text-white'
                        : isDarkTheme ? 'bg-slate-700 text-slate-300' : 'bg-[#EFE4D2] text-[#8C7A6B]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* App Download / Install Card */}
        <div className={`p-3 rounded-2xl border text-xs space-y-2.5 transition ${
          isDarkTheme
            ? 'bg-slate-800/60 border-slate-700/60'
            : 'bg-gradient-to-tr from-[#FAF4EA] to-[#EFE4D2]/70 border-[#E8DFC8]'
        }`}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#B88037] text-white flex items-center justify-center shrink-0 shadow">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-[11px] leading-tight">Mobile &amp; PC App</p>
              <p className={`text-[10px] ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>Install &amp; use offline</p>
            </div>
          </div>
          <button
            onClick={() => setShowDownloadModal(true)}
            className="w-full py-2 rounded-xl bg-[#B88037] hover:bg-[#A36F2B] text-white text-[11px] font-bold shadow transition flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download / Install App</span>
          </button>
        </div>

      </div>

      <DownloadAppModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        isDarkTheme={isDarkTheme}
      />
    </aside>
  );
};
