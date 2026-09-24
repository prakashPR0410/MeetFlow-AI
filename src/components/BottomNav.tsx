import React from 'react';
import {
  LayoutDashboard,
  Video,
  Upload,
  Sparkles,
  MessageSquare,
  FileText,
  Settings
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkTheme: boolean;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  isDarkTheme,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'summary', label: 'Summary', icon: Sparkles },
    { id: 'transcripts', label: 'History', icon: Video },
    { id: 'reports', label: 'PDF Generator', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 pointer-events-none flex justify-center">
      <nav className={`pointer-events-auto px-3 py-2 rounded-2xl border backdrop-blur-2xl shadow-2xl flex items-center justify-around gap-1 sm:gap-2 max-w-lg w-full transition-all ${
        isDarkTheme
          ? 'bg-slate-900/90 border-slate-800/90 shadow-purple-950/40 text-slate-300'
          : 'bg-[#FFF7F0]/95 border-[#FFDEC9] shadow-2xl text-[#3B1C0B]'
      }`}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition transform active:scale-95 ${
                isActive
                  ? isDarkTheme
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg'
                  : isDarkTheme
                    ? 'hover:bg-purple-500/10 text-slate-400 hover:text-purple-300'
                    : 'hover:bg-orange-500/10 text-[#7C4D30] hover:text-orange-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-bold mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
