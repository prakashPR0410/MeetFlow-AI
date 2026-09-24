import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowLeft,
  Briefcase,
  Plus
} from 'lucide-react';

interface AuthViewProps {
  onLoginSuccess: (userData: { name: string; email: string }) => void;
  onBackToLanding: () => void;
  isDarkTheme: boolean;
}

export const AuthView: React.FC<AuthViewProps> = ({
  onLoginSuccess,
  onBackToLanding,
  isDarkTheme,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('masaramsatyavasuprakash@gmail.com');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('Vasu Prakash');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Google OAuth Modal State: 2-step Account Chooser & Permissions
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleStep, setGoogleStep] = useState<'choose_account' | 'permissions'>('choose_account');
  const [googleLoading, setGoogleLoading] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState({
    name: 'Vasu Prakash',
    email: 'masaramsatyavasuprakash@gmail.com',
    type: 'Current Active Account (Signed In)',
    avatar: 'VP'
  });
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'forgot') {
        setSuccessMsg('Reset link sent! Please check your email inbox.');
        return;
      }

      // Password validation in sign-in mode
      if (mode === 'signin') {
        const validPasswords = ['meetflow2026', 'MeetFlow@2026', 'admin123', 'password'];
        if (!validPasswords.includes(password.trim())) {
          setErrorMsg('Incorrect password. The password you entered is incorrect. Please try again or use the demo master password: meetflow2026');
          return;
        }
      }

      onLoginSuccess({
        name: mode === 'signup' ? fullName : (fullName || 'Vasu Prakash'),
        email: email || 'masaramsatyavasuprakash@gmail.com',
      });
    }, 600);
  };

  const handleSocialAuth = (provider: string) => {
    if (provider === 'Google') {
      setShowGoogleModal(true);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (provider === 'GitHub') {
        onLoginSuccess({
          name: 'Vasu Prakash (GitHub)',
          email: 'masaramsatyavasuprakash@gmail.com',
        });
      } else {
        onLoginSuccess({
          name: `User via ${provider}`,
          email: 'masaramsatyavasuprakash@gmail.com',
        });
      }
    }, 600);
  };

  const handleGoogleGrant = () => {
    setGoogleLoading(true);
    setTimeout(() => {
      setGoogleLoading(false);
      setShowGoogleModal(false);
      onLoginSuccess({
        name: 'Vasu Prakash',
        email: 'masaramsatyavasuprakash@gmail.com',
      });
    }, 900);
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between relative overflow-hidden font-sans transition-colors duration-300 ${
      isDarkTheme ? 'bg-[#0B0A10] text-slate-100' : 'bg-[#FAF6EE] text-[#2C221E]'
    }`}>
      
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Header */}
      <header className="p-6 relative z-10 flex items-center justify-between max-w-7xl mx-auto w-full">
        <button
          onClick={onBackToLanding}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition ${
            isDarkTheme
              ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
              : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#2C221E] hover:bg-[#EFE4D2]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go to Home Page</span>
        </button>

        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
            MeetFlow AI
          </span>
        </div>
      </header>

      {/* Center Auth Card with Curved Semi-Circle Glassmorphism */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10 my-8">
        <div className={`w-full max-w-xl rounded-[36px] p-8 sm:p-12 border backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-300 ${
          isDarkTheme
            ? 'bg-slate-900/70 border-slate-800/80 shadow-purple-950/50'
            : 'bg-white/85 border-[#E8DFC8] shadow-2xl'
        }`}>
          
          {/* Curved Decorative Gradient Ribbon */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 blur-2xl opacity-40 pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-500 blur-2xl opacity-30 pointer-events-none" />

          {/* Mode Switch Pills */}
          {mode !== 'forgot' && (
            <div className={`flex p-1.5 rounded-2xl border mb-8 ${
              isDarkTheme ? 'bg-slate-950/80 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
            }`}>
              <button
                onClick={() => setMode('signin')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                  mode === 'signin'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg'
                    : isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Title & Subtitle */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {mode === 'signin' && 'Welcome Back to MeetFlow'}
              {mode === 'signup' && 'Create Your AI Workspace'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h2>
            <p className={`mt-2 text-xs font-medium ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              {mode === 'signin' && 'Sign in to access meeting transcripts, RAG chat, & PDF summaries'}
              {mode === 'signup' && 'Get instant access to Whisper ASR & AI Meeting Intelligence'}
              {mode === 'forgot' && 'Enter your email address to receive password recovery instructions'}
            </p>
          </div>

          {/* Notification Banners */}
          {errorMsg && (
            <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Social Logins (Google, GitHub, Microsoft) */}
          {mode !== 'forgot' && (
            <div className="space-y-3 mb-6">
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialAuth('Google')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                    isDarkTheme
                      ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                      : 'bg-white border-[#E8DFC8] hover:bg-[#FAF4EA] text-[#2C221E]'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="hidden sm:inline">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('GitHub')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                    isDarkTheme
                      ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                      : 'bg-white border-[#E8DFC8] hover:bg-[#FAF4EA] text-[#2C221E]'
                  }`}
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="hidden sm:inline">GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialAuth('Microsoft')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                    isDarkTheme
                      ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-700 text-slate-200'
                      : 'bg-white border-[#E8DFC8] hover:bg-[#FAF4EA] text-[#2C221E]'
                  }`}
                >
                  <svg className="w-4 h-4" viewBox="0 0 23 23">
                    <path fill="#f35325" d="M1 1h10v10H1z" />
                    <path fill="#81bc06" d="M12 1h10v10H12z" />
                    <path fill="#05a6f0" d="M1 12h10v10H1z" />
                    <path fill="#ffba08" d="M12 12h10v10H12z" />
                  </svg>
                  <span className="hidden sm:inline">Microsoft</span>
                </button>
              </div>

              <div className="relative my-6 text-center">
                <div className={`absolute inset-0 flex items-center ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}`}>
                  <div className="w-full border-t border-inherit" />
                </div>
                <span className={`relative px-4 text-[11px] font-semibold uppercase ${
                  isDarkTheme ? 'bg-[#0F0E17] text-slate-500' : 'bg-white text-[#8C7A6B]'
                }`}>
                  or continue with email
                </span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name field if Sign Up */}
            {mode === 'signup' && (
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Vasu Prakash"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-medium focus:outline-none transition ${
                      isDarkTheme
                        ? 'bg-slate-950/80 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-purple-500/50'
                        : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E] focus:ring-2 focus:ring-[#D49B53]/50'
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className={`block text-xs font-bold ${isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}`}>
                  Email Address
                </label>
                <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3" /> Verified Account
                </span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="masaramsatyavasuprakash@gmail.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl text-xs font-medium focus:outline-none transition ${
                    isDarkTheme
                      ? 'bg-slate-950/80 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-purple-500/50'
                      : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E] focus:ring-2 focus:ring-[#D49B53]/50'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            {mode !== 'forgot' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`block text-xs font-bold ${isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}`}>
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] font-bold text-purple-400 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="Enter password (e.g. meetflow2026)"
                    className={`w-full pl-10 pr-10 py-3 rounded-xl text-xs font-medium focus:outline-none transition ${
                      isDarkTheme
                        ? 'bg-slate-950/80 border border-slate-800 text-slate-100 focus:ring-2 focus:ring-purple-500/50'
                        : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E] focus:ring-2 focus:ring-[#D49B53]/50'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {mode === 'signin' && (
                  <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Test credentials:</span>
                    <button
                      type="button"
                      onClick={() => setPassword('meetflow2026')}
                      className="text-[#B88037] hover:underline font-bold"
                    >
                      Use Demo Password (meetflow2026)
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 rounded-xl text-xs font-bold text-white shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:shadow-purple-500/30'
                  : 'bg-gradient-to-r from-[#D49B53] to-[#B88037] hover:shadow-[#D49B53]/30'
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'signin' && 'Sign In to Dashboard'}
                    {mode === 'signup' && 'Create Workspace Account'}
                    {mode === 'forgot' && 'Send Reset Recovery Email'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-6 border-t border-slate-800/60 text-center">
            <button
              onClick={() => onLoginSuccess({ name: 'Alex Morgan', email: 'alex.morgan@meetflow.ai' })}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Instant One-Click Demo Access</span>
            </button>
          </div>

          {mode === 'forgot' && (
            <button
              onClick={() => setMode('signin')}
              className="mt-4 w-full text-center text-xs text-purple-400 font-bold hover:underline"
            >
              Back to Sign In
            </button>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-500 relative z-10">
        MeetFlow AI • Enterprise Meeting Intelligence & Speech Analytics
      </footer>

      {/* Google OAuth Permissions Modal (2-Step Real Google Flow) */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl border p-6 sm:p-7 shadow-2xl space-y-5 transition ${
            isDarkTheme ? 'bg-[#13121D] border-slate-700 text-slate-100' : 'bg-white border-[#E8DFC8] text-[#2C221E]'
          }`}>
            {/* Header with Google Logo */}
            <div className="flex items-center justify-between border-b pb-4 border-inherit">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span className="font-bold text-sm">Sign in with Google</span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {googleStep === 'choose_account' ? 'Step 1 of 2: Account' : 'Step 2 of 2: Permissions'}
              </span>
            </div>

            {/* STEP 1: CHOOSE WHICH GOOGLE ACCOUNT YOU HAVE */}
            {googleStep === 'choose_account' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">Choose an account</h3>
                  <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                    Select which Google Account you want to use with MeetFlow AI:
                  </p>
                </div>

                {/* Available Accounts List */}
                <div className="space-y-2.5">
                  {/* Account 1: masaramsatyavasuprakash@gmail.com */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGoogleAccount({
                        name: 'Vasu Prakash',
                        email: 'masaramsatyavasuprakash@gmail.com',
                        type: 'Current Active Account (Signed In)',
                        avatar: 'VP'
                      });
                      setGoogleStep('permissions');
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition hover:border-blue-500 ${
                      selectedGoogleAccount.email === 'masaramsatyavasuprakash@gmail.com'
                        ? 'border-blue-500 bg-blue-500/5'
                        : isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow shrink-0">
                      VP
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm">Vasu Prakash</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      </div>
                      <p className="text-xs text-slate-400 font-mono truncate">masaramsatyavasuprakash@gmail.com</p>
                      <span className="text-[10px] text-emerald-500 font-medium">Signed In • Device Account</span>
                    </div>
                    <span className="text-xs text-blue-500 font-bold shrink-0">Select &gt;</span>
                  </button>

                  {/* Account 2: satyavasu.developer@gmail.com */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGoogleAccount({
                        name: 'Vasu Prakash (Dev)',
                        email: 'satyavasu.developer@gmail.com',
                        type: 'Google Workspace Account',
                        avatar: 'VP'
                      });
                      setGoogleStep('permissions');
                    }}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition hover:border-blue-500 ${
                      isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow shrink-0">
                      VD
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs sm:text-sm">Vasu Prakash (Dev)</span>
                      <p className="text-xs text-slate-400 font-mono truncate">satyavasu.developer@gmail.com</p>
                      <span className="text-[10px] text-slate-400">Google Workspace</span>
                    </div>
                    <span className="text-xs text-slate-400 font-bold shrink-0">&gt;</span>
                  </button>

                  {/* Option 3: Use another Google account */}
                  {!showCustomInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCustomInput(true)}
                      className={`w-full p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${
                        isDarkTheme ? 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-white border-[#E8DFC8] text-[#2C221E] hover:bg-[#FAF4EA]'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Use another Google account</span>
                    </button>
                  ) : (
                    <div className={`p-3 rounded-xl border space-y-2 ${
                      isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                    }`}>
                      <label className="text-[11px] font-bold block">Enter Google Email Address</label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          value={customGoogleEmail}
                          onChange={(e) => setCustomGoogleEmail(e.target.value)}
                          placeholder="name@gmail.com"
                          className="flex-1 px-3 py-1.5 rounded-lg text-xs border border-slate-700 bg-black/20 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (!customGoogleEmail.trim()) return;
                            setSelectedGoogleAccount({
                              name: customGoogleEmail.split('@')[0],
                              email: customGoogleEmail.trim(),
                              type: 'Custom Google Account',
                              avatar: customGoogleEmail.slice(0, 2).toUpperCase()
                            });
                            setGoogleStep('permissions');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(false)}
                    className="text-xs text-slate-400 hover:text-slate-200"
                  >
                    Cancel
                  </button>
                  <p className="text-[10px] text-slate-400">
                    To continue, Google will share your profile with MeetFlow AI.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: GET PERMISSION FROM THE SELECTED GOOGLE ACCOUNT */}
            {googleStep === 'permissions' && (
              <div className="space-y-4">
                {/* Active Selected Account Badge */}
                <div className={`p-3 rounded-2xl border flex items-center justify-between ${
                  isDarkTheme ? 'bg-slate-900 border-slate-800' : 'bg-[#FAF4EA] border-[#E8DFC8]'
                }`}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                      {selectedGoogleAccount.avatar}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold truncate">{selectedGoogleAccount.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">{selectedGoogleAccount.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGoogleStep('choose_account')}
                    className="text-[11px] text-blue-500 font-bold hover:underline shrink-0 ml-2"
                  >
                    Change
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-base">MeetFlow AI wants to access your Google Account</h3>
                  <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                    Grant the following permissions to allow seamless meeting intelligence and AI transcription:
                  </p>
                </div>

                {/* Permissions Scopes List */}
                <div className="space-y-2">
                  <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                    isDarkTheme ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs">Primary Google Account Email</span>
                      <p className="text-[11px] text-slate-400">View and verify {selectedGoogleAccount.email}</p>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                    isDarkTheme ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs">Google Meet Audio & Video</span>
                      <p className="text-[11px] text-slate-400">Connect to scheduled live room sessions and capture audio</p>
                    </div>
                  </div>

                  <div className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                    isDarkTheme ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs">Google Calendar Integration</span>
                      <p className="text-[11px] text-slate-400">Sync scheduled meeting times and member invites</p>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 leading-relaxed">
                  By clicking &quot;Allow &amp; Grant Permission&quot;, you grant MeetFlow AI permission to access these Google services for {selectedGoogleAccount.email}.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setGoogleStep('choose_account')}
                    disabled={googleLoading}
                    className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition ${
                      isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-[#E8DFC8] text-[#2C221E] hover:bg-[#FAF4EA]'
                    }`}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleGrant}
                    disabled={googleLoading}
                    className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg transition flex items-center justify-center gap-2"
                  >
                    {googleLoading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Granting Permission...</span>
                      </>
                    ) : (
                      <span>Allow & Grant Permission</span>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
