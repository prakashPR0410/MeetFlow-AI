import React, { useState, useEffect } from 'react';
import {
  Download,
  Smartphone,
  Laptop,
  CheckCircle2,
  X,
  Share2,
  ShieldCheck,
  Check,
  Apple
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme?: boolean;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
  isDarkTheme = false,
}) => {
  const [activeDeviceTab, setActiveDeviceTab] = useState<'pc' | 'mobile'>('pc');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Capture beforeinstallprompt event for Chromium / Android / Edge
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setInstallSuccess(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  if (!isOpen) return null;

  // Trigger PWA Install
  const handleInstallApp = async () => {
    if (deferredPrompt) {
      setIsInstalling(true);
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setInstallSuccess(true);
          setIsInstalled(true);
        }
      } catch (err) {
        console.error('Install prompt error:', err);
      } finally {
        setIsInstalling(false);
      }
    } else {
      // Fallback: Generate and trigger download of desktop application shortcut launcher
      downloadDesktopShortcut();
    }
  };

  // Download Desktop Shortcut Launcher file (.url / .html launcher)
  const downloadDesktopShortcut = () => {
    const currentUrl = window.location.href;
    const shortcutContent = `[InternetShortcut]
URL=${currentUrl}
IconIndex=0
IconFile=${window.location.origin}/icon.svg
HotKey=0
IDList=
[{000214A0-0000-0000-C000-000000000046}]
Prop3=19,11
`;
    const blob = new Blob([shortcutContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MeetFlow AI - Desktop Launcher.url';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setInstallSuccess(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className={`w-full max-w-xl rounded-3xl border p-6 sm:p-7 shadow-2xl space-y-6 transition relative max-h-[90vh] overflow-y-auto ${
        isDarkTheme ? 'bg-[#12111D] border-slate-700 text-slate-100' : 'bg-white border-[#E8DFC8] text-[#2C221E]'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-5 right-5 p-2 rounded-xl transition ${
            isDarkTheme ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-[#FAF4EA] text-[#6E615A]'
          }`}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D49B53] to-[#B88037] text-white flex items-center justify-center shadow-lg shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold">Download &amp; Install MeetFlow AI</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PWA App
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              Use MeetFlow AI as a native application on your PC and mobile phone with offline support.
            </p>
          </div>
        </div>

        {/* Device Switcher Tabs: PC vs Mobile Phone */}
        <div className={`p-1.5 rounded-2xl border flex items-center gap-1 ${
          isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
        }`}>
          <button
            onClick={() => setActiveDeviceTab('pc')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeDeviceTab === 'pc'
                ? 'bg-[#B88037] text-white shadow-md'
                : isDarkTheme ? 'text-slate-400 hover:text-slate-200' : 'text-[#6E615A] hover:text-[#2C221E]'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>Install on PC (Windows / Mac / Linux)</span>
          </button>

          <button
            onClick={() => setActiveDeviceTab('mobile')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activeDeviceTab === 'mobile'
                ? 'bg-[#B88037] text-white shadow-md'
                : isDarkTheme ? 'text-slate-400 hover:text-slate-200' : 'text-[#6E615A] hover:text-[#2C221E]'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Install on Mobile Phone</span>
          </button>
        </div>

        {/* TAB 1: PC (DESKTOP) INSTALLATION & DOWNLOAD */}
        {activeDeviceTab === 'pc' && (
          <div className="space-y-4">
            
            {/* Main Action Card */}
            <div className={`p-5 rounded-2xl border space-y-3.5 ${
              isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1.5">
                    <Laptop className="w-4 h-4 text-[#B88037]" />
                    <span>Desktop App (Standalone Window)</span>
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                    Installs directly to your PC desktop or taskbar. Opens in a clean dedicated window without browser address bars.
                  </p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                  Chromium &amp; Edge
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  onClick={handleInstallApp}
                  disabled={isInstalling}
                  className="flex-1 py-3 rounded-xl bg-[#B88037] hover:bg-[#A36F2B] text-white text-xs font-bold shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {isInstalling ? 'Installing App...' : installSuccess ? 'Installed / Launcher Ready' : 'Install Desktop App'}
                  </span>
                </button>

                <button
                  onClick={downloadDesktopShortcut}
                  className={`px-4 py-3 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-2 ${
                    isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-[#E8DFC8] text-[#2C221E] hover:bg-white'
                  }`}
                >
                  <span>Desktop Launcher (.url)</span>
                </button>
              </div>

              {installSuccess && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Desktop App Ready! Check your desktop or app launcher.</span>
                </div>
              )}
            </div>

            {/* Browser Step-by-Step Instructions */}
            <div className={`p-4 rounded-2xl border space-y-2 text-xs ${
              isDarkTheme ? 'bg-slate-950/60 border-slate-800' : 'bg-white border-[#E8DFC8]'
            }`}>
              <span className="font-bold text-[11px] uppercase tracking-wider text-slate-400 block">
                How to install in your PC browser:
              </span>
              <div className="space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B88037]/20 text-[#B88037] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <span>Look at the right side of your browser address bar (URL bar).</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B88037]/20 text-[#B88037] font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <span>Click the <strong>Install icon (computer with down arrow)</strong> or 3 dots &gt; &quot;Install MeetFlow AI&quot;.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B88037]/20 text-[#B88037] font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <span>Click <strong>Install</strong> to pin it to your desktop taskbar.</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MOBILE PHONE (ANDROID & IPHONE) INSTALLATION */}
        {activeDeviceTab === 'mobile' && (
          <div className="space-y-4">
            
            {/* Android Phone Card */}
            <div className={`p-4 rounded-2xl border space-y-2.5 ${
              isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Android Phone (Google Chrome)</span>
                </h4>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Instant WebAPK
                </span>
              </div>
              <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                On your Android phone in Chrome, tap the <strong>3 dots menu (⋮)</strong> at the top-right and tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
              </p>
              <button
                onClick={handleInstallApp}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Add / Install on Android Phone</span>
              </button>
            </div>

            {/* iPhone / iPad (iOS Safari) Card */}
            <div className={`p-4 rounded-2xl border space-y-2.5 ${
              isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs sm:text-sm flex items-center gap-2">
                  <Apple className="w-4 h-4 text-slate-200" />
                  <span>iPhone &amp; iPad (Apple Safari)</span>
                </h4>
                <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  iOS Safari
                </span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                  <span>Open this web application in <strong>Safari</strong> on your iPhone.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                  <span>Tap the <strong>Share</strong> button <Share2 className="w-3.5 h-3.5 inline text-blue-400" /> at the bottom toolbar.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                  <span>Scroll down and tap <strong>&quot;Add to Home Screen&quot; (+)</strong>.</span>
                </div>
              </div>
            </div>

            {/* Quick Mobile URL Link Sharing */}
            <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${
              isDarkTheme ? 'bg-slate-950/70 border-slate-800' : 'bg-white border-[#E8DFC8]'
            }`}>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">App URL to open on Phone</span>
                <span className="text-xs font-mono text-[#B88037] truncate block">{window.location.href}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-xl border text-xs font-bold bg-[#B88037] text-white shadow hover:bg-[#A36F2B] transition flex items-center gap-1 shrink-0"
              >
                {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedUrl ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>

          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-inherit text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure PWA • Works Offline &amp; Online</span>
          </div>
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-xl border font-semibold transition ${
              isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E] hover:bg-[#EFE4D2]'
            }`}
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
