import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Bot,
  FileText,
  Video,
  Mic,
  BarChart3,
  CheckCircle2,
  Lock,
  Globe,
  Users,
  ChevronDown,
  Star,
  Play,
  Download,
  Calendar,
  Layers,
  Sparkle
} from 'lucide-react';
import { DownloadAppModal } from './DownloadAppModal';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onLaunchDemo: () => void;
  isDarkTheme: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSignIn,
  onSignUp,
  onLaunchDemo,
  isDarkTheme,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDarkTheme 
        ? 'bg-[#0F0E17] text-slate-100 selection:bg-purple-500 selection:text-white' 
        : 'bg-[#FAF6EE] text-[#2C221E] selection:bg-[#D49B53] selection:text-white'
    }`}>
      
      {/* Top Navbar */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        isDarkTheme
          ? 'bg-[#0F0E17]/80 border-slate-800/80'
          : 'bg-[#FAF6EE]/90 border-[#E8DFC8]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onLaunchDemo}>
            <div className={`w-11 h-11 rounded-2xl p-0.5 shadow-lg flex items-center justify-center transform hover:scale-105 transition ${
              isDarkTheme
                ? 'bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400'
                : 'bg-gradient-to-tr from-[#D49B53] to-[#B88037]'
            }`}>
              <div className={`w-full h-full rounded-[14px] flex items-center justify-center ${
                isDarkTheme ? 'bg-[#0F0E17]' : 'bg-[#FAF4EA]'
              }`}>
                <Sparkles className={`w-6 h-6 ${isDarkTheme ? 'text-purple-400' : 'text-[#B88037]'}`} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  MeetFlow AI
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isDarkTheme 
                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/20'
                    : 'bg-[#EFE4D2] text-[#B88037] border-[#DFD3C0]'
                }`}>
                  PRO 2.5
                </span>
              </div>
              <p className={`text-[11px] font-medium ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                Intelligence SaaS Assistant
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#features" className={`transition hover:text-purple-400 ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>Features</a>
            <a href="#workflow" className={`transition hover:text-purple-400 ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>AI Workflow</a>
            <a href="#pricing" className={`transition hover:text-purple-400 ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>Pricing</a>
            <a href="#testimonials" className={`transition hover:text-purple-400 ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>Testimonials</a>
            <a href="#faq" className={`transition hover:text-purple-400 ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>FAQ</a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Download App Button */}
            <button
              onClick={() => setShowDownloadModal(true)}
              title="Download App on Mobile Phone & PC"
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border shadow-sm ${
                isDarkTheme
                  ? 'bg-[#B88037]/15 border-[#B88037]/40 text-[#D49B53] hover:bg-[#B88037]/25'
                  : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#B88037] hover:bg-[#EFE4D2]'
              }`}
            >
              <Download className="w-4 h-4 text-[#B88037]" />
              <span className="hidden sm:inline">Download App</span>
            </button>

            <button
              onClick={onSignIn}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                isDarkTheme
                  ? 'text-slate-200 hover:bg-slate-800/80 border border-slate-700/60'
                  : 'text-[#2C221E] hover:bg-[#EFE4D2] border border-[#E8DFC8]'
              }`}
            >
              Sign In
            </button>
            
            <button
              onClick={onSignUp}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:shadow-purple-500/25'
                  : 'bg-gradient-to-r from-[#D49B53] to-[#B88037] hover:shadow-[#D49B53]/30'
              }`}
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/15 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border mb-8 animate-fade-in shadow-sm ${
            isDarkTheme 
              ? 'bg-purple-950/40 text-purple-300 border-purple-500/30' 
              : 'bg-[#EFE4D2] text-[#B88037] border-[#DFD3C0]'
          }">
            <Sparkle className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
            <span>Next-Gen AI Meeting Assistant with RAG Intelligence & PDF Export</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.15]">
            Turn Meeting Audio & Video into{' '}
            <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
              Actionable Intelligence
            </span>
          </h1>

          <p className={`mt-6 text-lg sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed ${
            isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'
          }`}>
            Transcribe with Whisper ASR, auto-generate key takeaways & action item deadlines, query live transcripts with RAG AI Chat, and download instant executive PDF reports.
          </p>

          {/* Hero CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchDemo}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold text-white shadow-xl transition transform hover:-translate-y-1 flex items-center justify-center gap-3 ${
                isDarkTheme
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 shadow-purple-600/30'
                  : 'bg-gradient-to-r from-[#D49B53] to-[#B88037] shadow-[#D49B53]/30'
              }`}
            >
              <Zap className="w-5 h-5" />
              <span>Launch Live Dashboard Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onSignIn}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-semibold transition flex items-center justify-center gap-2 border ${
                isDarkTheme
                  ? 'bg-slate-900/80 border-slate-700/80 text-slate-200 hover:bg-slate-800'
                  : 'bg-[#F5EFE4] border-[#E8DFC8] text-[#2C221E] hover:bg-[#EFE4D2]'
              }`}
            >
              <Play className="w-4 h-4 text-purple-400 fill-purple-400" />
              <span>Sign In to Your Workspace</span>
            </button>
          </div>

          {/* Rating Proof */}
          <div className="mt-8 flex items-center justify-center gap-3 text-xs text-slate-400">
            <div className="flex -space-x-2">
              {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'].map((src, i) => (
                <img key={i} src={src} alt="user" className="w-8 h-8 rounded-full border-2 border-[#0F0E17] object-cover" />
              ))}
            </div>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <span className={isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}>
              Loved by 12,000+ teams • 99.4% Transcription Precision
            </span>
          </div>

          {/* Floating SaaS Interactive UI Mockup */}
          <div className="mt-16 relative mx-auto max-w-5xl rounded-3xl p-3 border shadow-2xl backdrop-blur-2xl transition ${
            isDarkTheme
              ? 'bg-slate-900/60 border-slate-800/80 shadow-purple-950/40'
              : 'bg-white/80 border-[#E8DFC8] shadow-2xl'
          }">
            <div className={`rounded-2xl p-6 text-left border overflow-hidden relative ${
              isDarkTheme ? 'bg-[#0F0E17]/90 border-slate-800' : 'bg-[#FAF6EE] border-[#E8DFC8]'
            }`}>
              
              {/* Mockup Header */}
              <div className="flex items-center justify-between border-b pb-4 mb-6 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className={`text-xs font-mono px-3 py-1 rounded-md ${isDarkTheme ? 'bg-slate-800 text-slate-300' : 'bg-[#EFE4D2] text-[#2C221E]'}`}>
                    AI Meeting Intelligence & RAG Engine • Live Preview
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Whisper Active
                  </span>
                </div>
              </div>

              {/* Mockup Grid Body */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Left Transcript Preview */}
                <div className={`p-4 rounded-xl border col-span-2 space-y-3 ${
                  isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E8DFC8]'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold text-purple-400">
                    <span className="flex items-center gap-1.5"><Mic className="w-4 h-4" /> Real-time Speech Transcript</span>
                    <span className="text-slate-400">Accuracy: 98.4%</span>
                  </div>
                  <div className="space-y-2.5 text-xs">
                    <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <span className="font-bold text-purple-300">Alex Morgan [00:02]:</span> "Welcome team. Let's review the RAG retrieval speed for FAISS vector embeddings."
                    </div>
                    <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                      <span className="font-bold text-indigo-300">Sarah Chen [02:15]:</span> "Whisper ASR converted audio into chunked timestamps with 96%+ precision."
                    </div>
                    <div className="p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <span className="font-bold text-cyan-300">David Miller [05:40]:</span> "LlamaIndex query pipeline retrieves matching meeting chunks in sub-1.8 seconds."
                    </div>
                  </div>
                </div>

                {/* Right AI Action Items & Key Takeaways */}
                <div className={`p-4 rounded-xl border space-y-4 ${
                  isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#E8DFC8]'
                }`}>
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-400">
                    <span className="flex items-center gap-1.5"><Bot className="w-4 h-4" /> Auto-Generated Summary</span>
                    <span className="text-xs text-emerald-400">Ready</span>
                  </div>

                  <div className="space-y-2">
                    <p className={`text-[11px] font-medium leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>
                      Team finalized Whisper speech recognition & vector database schemas with 3NF normalization.
                    </p>
                  </div>

                  <div className="border-t pt-3 space-y-2 ${isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'}">
                    <div className="text-[11px] font-bold text-purple-400 flex items-center justify-between">
                      <span>Action Items</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300">3 Pending</span>
                    </div>
                    <div className="space-y-1.5 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">Implement 3D glassmorphism interface</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">Optimize vector embedding size</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={onLaunchDemo}
                    className="w-full py-2 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-500 transition flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Export PDF Summary
                  </button>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 border-t ${isDarkTheme ? 'border-slate-800/80 bg-slate-950/40' : 'border-[#E8DFC8] bg-[#F5EFE4]/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase">Engineered for High-Performance Teams</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">Everything You Need for Meeting Mastery</p>
            <p className={`mt-4 text-base ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
              From live speech-to-text recording to vectorized semantic document retrieval and custom PDF synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {[
              {
                icon: Mic,
                title: 'Whisper Speech Recognition',
                desc: 'Converts WAV, MP3, and video recordings into clean timestamped transcriptions with speaker identification.',
                color: 'from-purple-500 to-indigo-600'
              },
              {
                icon: Bot,
                title: 'RAG Contextual AI Chat',
                desc: 'Ask complex natural language questions against past meetings. Retrieve exact source chunks without hallucinations.',
                color: 'from-indigo-500 to-cyan-500'
              },
              {
                icon: FileText,
                title: 'Instant PDF Report Generation',
                desc: 'Download executive summary PDFs with key discussion points, assigned deadlines, and speaker highlights with one click.',
                color: 'from-cyan-500 to-emerald-500'
              },
              {
                icon: CheckCircle2,
                title: 'Smart Action Items Tracker',
                desc: 'Automatically extracts assigned tasks, assignees, and deadlines. Track task completion across all team meetings.',
                color: 'from-amber-500 to-rose-500'
              },
              {
                icon: Layers,
                title: '3D Vector Semantic Graph',
                desc: 'Visualize chunk embeddings and cosine similarity scores in an interactive WebGL vector space explorer.',
                color: 'from-purple-600 to-pink-500'
              },
              {
                icon: Lock,
                title: 'Enterprise Security & Compliance',
                desc: 'Full role-based access controls, encrypted SQLite/Firestore database storage, and secure authentication flows.',
                color: 'from-blue-500 to-purple-600'
              }
            ].map((feat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition duration-300 hover:-translate-y-1 group ${
                  isDarkTheme
                    ? 'bg-slate-900/60 border-slate-800 hover:border-purple-500/50 hover:bg-slate-900/90'
                    : 'bg-white/80 border-[#E8DFC8] hover:border-[#D49B53] hover:shadow-xl'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feat.color} p-0.5 mb-5 shadow-lg flex items-center justify-center transform group-hover:scale-110 transition`}>
                  <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${isDarkTheme ? 'bg-[#0F0E17]' : 'bg-white'}`}>
                    <feat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">{feat.title}</h3>
                <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  {feat.desc}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* AI Workflow Section */}
      <section id="workflow" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-cyan-400 uppercase">Seamless 4-Step Automation</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">How MeetFlow AI Transforms Your Workflow</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {[
              { step: '01', title: 'Record or Upload', desc: 'Capture live audio from microphone or upload MP3, WAV, or MP4 files.', icon: Mic },
              { step: '02', title: 'AI Whisper Speech-to-Text', desc: 'Whisper ASR extracts timestamped speaker dialogue and chunked segments.', icon: Zap },
              { step: '03', title: 'Vector RAG Indexing', desc: 'Transcripts are converted into vector embeddings for instant semantic search.', icon: Layers },
              { step: '04', title: 'Summary & PDF Export', desc: 'Generate executive meeting summaries, action item checklists, and PDF files.', icon: Download }
            ].map((st, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border relative ${
                  isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#E8DFC8]'
                }`}
              >
                <span className="text-3xl font-extrabold text-purple-500/30 block mb-2">{st.step}</span>
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <st.icon className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-base mb-2">{st.title}</h4>
                <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>{st.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className={`py-20 border-t ${isDarkTheme ? 'border-slate-800/80 bg-slate-950/40' : 'border-[#E8DFC8] bg-[#F5EFE4]/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase">Flexible Plans</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold">Transparent Pricing for Teams of All Sizes</p>
            
            {/* Monthly / Annual Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-2xl border bg-slate-900/60 border-slate-800">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  billingCycle === 'monthly' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-purple-600 text-white shadow' : 'text-slate-400'
                }`}
              >
                <span>Annual Billing</span>
                <span className="bg-emerald-400/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-extrabold">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: billingCycle === 'annual' ? '$0' : '$0',
                period: 'forever free',
                desc: 'Perfect for individual researchers & small CSE project teams.',
                features: ['3 Hours Transcription / month', 'Standard AI Meeting Summaries', 'Action Item Tracking', 'PDF Report Export', 'Community Support'],
                cta: 'Get Started Free',
                popular: false
              },
              {
                name: 'Pro SaaS',
                price: billingCycle === 'annual' ? '$19' : '$24',
                period: '/ user / month',
                desc: 'For high-growth product teams & enterprise managers.',
                features: ['Unlimited Whisper Transcription', 'RAG AI Chat Assistant', '3D Vector Graph Search', 'Custom PDF Branding', 'Google / Teams Calendar Sync', 'Priority AI Models'],
                cta: 'Start 14-Day Free Trial',
                popular: true
              },
              {
                name: 'Enterprise',
                price: billingCycle === 'annual' ? '$49' : '$59',
                period: '/ user / month',
                desc: 'Dedicated cloud database, custom LLM fine-tuning & SLA.',
                features: ['Custom On-Prem SQLite / Cloud SQL', 'Custom Python Module Extensions', '24/7 Dedicated Support', 'SSO & Advanced Security', 'Custom API Access'],
                cta: 'Contact Sales',
                popular: false
              }
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-3xl border relative transition flex flex-col justify-between ${
                  plan.popular
                    ? isDarkTheme 
                      ? 'bg-gradient-to-b from-purple-950/40 to-slate-900 border-purple-500/50 shadow-2xl shadow-purple-900/30 ring-2 ring-purple-500/50' 
                      : 'bg-white border-[#D49B53] shadow-2xl ring-2 ring-[#D49B53]/40'
                    : isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-white/80 border-[#E8DFC8]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md">
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <p className={`text-xs mb-6 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>{plan.desc}</p>

                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                    <span className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                        <span className={isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={onLaunchDemo}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition shadow-md ${
                    plan.popular
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : isDarkTheme
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-[#FAF4EA] border border-[#E8DFC8] text-[#2C221E] hover:bg-[#EFE4D2]'
                  }`}
                >
                  {plan.cta}
                </button>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold tracking-widest text-indigo-400 uppercase">Trusted by Engineering Leaders</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold">What Our Users Say</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "MeetFlow AI saved our product sprint planning team over 12 hours every week. The PDF report generator is exceptionally clean.",
                author: "Alex Morgan",
                role: "VP of Engineering",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              },
              {
                quote: "The RAG vector search capability lets me query exact decision timestamps from meetings held 3 months ago in under two seconds.",
                author: "Sarah Chen",
                role: "Senior AI Engineer",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
              },
              {
                quote: "Whisper speech transcription accuracy is higher than any commercial meeting bot I have tested before.",
                author: "David Miller",
                role: "Head of Infrastructure",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              }
            ].map((t, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-4 ${
                  isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#E8DFC8]'
                }`}
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className={`text-xs leading-relaxed italic ${isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'}`}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img src={t.avatar} alt={t.author} className="w-9 h-9 rounded-full object-cover border border-purple-500/30" />
                  <div>
                    <h5 className="text-xs font-bold">{t.author}</h5>
                    <p className={`text-[10px] ${isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'}`}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={`py-20 border-t ${isDarkTheme ? 'border-slate-800/80 bg-slate-950/40' : 'border-[#E8DFC8] bg-[#F5EFE4]/50'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold tracking-widest text-purple-400 uppercase">Got Questions?</h2>
            <p className="mt-2 text-3xl font-extrabold">Frequently Asked Questions</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the AI transcription and Whisper model work?",
                a: "Audio recordings uploaded or captured via live microphone are chunked and processed using OpenAI's Whisper model. This extracts speech into timestamped text segments with high accuracy."
              },
              {
                q: "Can I generate PDF reports and export meeting summaries?",
                a: "Yes! Our built-in PDF Generator creates beautifully styled executive PDFs containing the meeting summary, key discussion points, participant list, and action items."
              },
              {
                q: "What is Retrieval-Augmented Generation (RAG) in this app?",
                a: "Transcripts and uploaded documents are stored as vector embeddings in a vector database. When you ask a question in the AI Chat, the system retrieves relevant meeting chunks via cosine similarity to formulate zero-hallucination answers."
              },
              {
                q: "Is my meeting data encrypted and private?",
                a: "Absolutely. All transcripts and vector store indices are stored locally or in isolated cloud project databases with strict security rules and access controls."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden transition ${
                  isDarkTheme ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-[#E8DFC8]'
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 text-left font-bold text-sm flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-purple-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>

                {openFaq === i && (
                  <div className={`px-5 pb-5 text-xs leading-relaxed border-t pt-3 ${
                    isDarkTheme ? 'text-slate-300 border-slate-800/80' : 'text-[#6E615A] border-[#E8DFC8]'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className={`p-12 rounded-3xl border relative shadow-2xl overflow-hidden ${
            isDarkTheme 
              ? 'bg-gradient-to-br from-purple-900/80 via-slate-900 to-slate-950 border-purple-500/40' 
              : 'bg-gradient-to-br from-[#D49B53]/20 via-[#FAF4EA] to-[#F5EFE4] border-[#D49B53]/40'
          }`}>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Ready to Upgrade Your Meeting Intelligence?
            </h2>
            <p className={`text-sm max-w-2xl mx-auto mb-8 ${isDarkTheme ? 'text-purple-200' : 'text-[#6E615A]'}`}>
              Join thousands of engineering teams utilizing Whisper ASR, RAG vector Q&A, and automated PDF executive summaries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onLaunchDemo}
                className="px-8 py-4 rounded-2xl text-sm font-bold bg-purple-600 text-white shadow-xl hover:bg-purple-500 transition flex items-center gap-2"
              >
                <span>Launch App Dashboard Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t py-12 text-xs ${isDarkTheme ? 'border-slate-800 bg-[#0A0912] text-slate-400' : 'border-[#E8DFC8] bg-[#F5EFE4] text-[#6E615A]'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="font-extrabold text-sm text-slate-200">MeetFlow AI</span>
            <span>• Enterprise Speech Intelligence & Autonomous Meeting Notes</span>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <a href="#features" className="hover:text-purple-400 transition">Features</a>
            <a href="#pricing" className="hover:text-purple-400 transition">Pricing</a>
            <button onClick={onSignIn} className="hover:text-purple-400 transition">Sign In</button>
            <button onClick={onLaunchDemo} className="hover:text-purple-400 transition">Dashboard</button>
          </div>

          <p>© 2025–2026 MeetFlow AI System. All rights reserved.</p>
        </div>
      </footer>

      {/* Download App Modal for Mobile & PC */}
      <DownloadAppModal
        isOpen={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        isDarkTheme={isDarkTheme}
      />

    </div>
  );
};
