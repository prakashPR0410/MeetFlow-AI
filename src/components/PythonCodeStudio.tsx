import React, { useState } from 'react';
import { Terminal, Play, FileCode, Copy, RefreshCw } from 'lucide-react';
import { PYTHON_MODULES } from '../data/initialData';
import { PythonCodeModule } from '../types';

interface PythonCodeStudioProps {
  isDarkTheme?: boolean;
}

export const PythonCodeStudio: React.FC<PythonCodeStudioProps> = ({ isDarkTheme = false }) => {
  const [selectedModule, setSelectedModule] = useState<PythonCodeModule>(PYTHON_MODULES[0]);
  const [editableCode, setEditableCode] = useState<string>(PYTHON_MODULES[0].code);
  const [terminalOutput, setTerminalOutput] = useState<string>(
    `[Python 3.12.3 Environment Ready]\nSelect a Python module above and click "Run Python Code" to execute.\n`
  );
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleModuleSelect = (mod: PythonCodeModule) => {
    setSelectedModule(mod);
    setEditableCode(mod.code);
  };

  const handleRunPython = async () => {
    setIsExecuting(true);
    setTerminalOutput((prev) => prev + `\n> Executing python ${selectedModule.filename}...\n`);

    try {
      const response = await fetch('/api/python/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: editableCode,
          moduleName: selectedModule.filename,
        }),
      });

      const data = await response.json();
      setTerminalOutput((prev) => prev + data.stdout + `\n[Exit Code ${data.exitCode}]\n`);
    } catch (err) {
      setTerminalOutput((prev) => prev + `[Python Exec Error] Failed to reach Python executor.\n`);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${
            isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'
          }`}>
            <Terminal className="w-6 h-6 text-[#D49B53]" /> Python Code Studio & WASM Execution Engine
          </h2>
          <p className={`text-xs mt-1 ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
            Inspect, edit, and execute live Python backend modules as specified in Chapter 7 (Implementation) of the PDF project report.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
          isDarkTheme ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' : 'clay-pill text-[#3B7A57] border-[#E6DCCB]'
        }`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          Python 3.12 Runtime
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className={`p-3 flex items-center gap-2 overflow-x-auto rounded-2xl border ${
        isDarkTheme ? 'bg-slate-900/80 border-slate-800' : 'clay-card'
      }`}>
        {PYTHON_MODULES.map((mod) => {
          const isSelected = mod.id === selectedModule.id;
          return (
            <button
              key={mod.id}
              onClick={() => handleModuleSelect(mod)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 transition ${
                isSelected
                  ? isDarkTheme
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-[#2C221E] text-white shadow-md'
                  : isDarkTheme
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'clay-button text-[#2C221E] hover:text-[#B88037]'
              }`}
            >
              <FileCode className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-[#8C7A6B]'}`} />
              <span>{mod.filename.replace('modules/', '')}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Python Source Editor */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`p-5 space-y-4 rounded-2xl border ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'clay-card text-[#2C221E]'
          }`}>
            
            {/* Editor Top Bar */}
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'
            }`}>
              <div>
                <h3 className="text-sm font-bold">{selectedModule.title}</h3>
                <p className={`text-[11px] font-medium ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  {selectedModule.description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 border transition ${
                    isDarkTheme ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'clay-button text-[#6E615A]'
                  }`}
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>

                <button
                  onClick={handleRunPython}
                  disabled={isExecuting}
                  className="clay-button-gold px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition hover:scale-105"
                >
                  {isExecuting ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>Run Code</span>
                </button>
              </div>
            </div>

            {/* Python Code Textarea */}
            <div className={`relative rounded-2xl overflow-hidden border ${
              isDarkTheme ? 'bg-[#0B0A12] border-slate-800 text-slate-100' : 'bg-[#1E1916] border-[#E6DCCB] text-[#F3EBE3]'
            }`}>
              <div className={`px-4 py-2 text-[10px] font-mono flex items-center justify-between border-b ${
                isDarkTheme ? 'bg-slate-900 border-slate-800 text-purple-300' : 'bg-[#2C221E] border-[#3D2E28] text-[#D49B53]'
              }`}>
                <span>🐍 {selectedModule.filename}</span>
                <span>UTF-8 • Python 3.12</span>
              </div>

              <textarea
                value={editableCode}
                onChange={(e) => setEditableCode(e.target.value)}
                rows={16}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs bg-transparent focus:outline-none leading-relaxed resize-none"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Terminal Output Console */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-5 space-y-4 rounded-2xl border ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100 shadow-xl' : 'clay-card text-[#2C221E]'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'
            }`}>
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#D49B53]" />
                <h3 className="text-sm font-bold">Python Terminal Console</h3>
              </div>
              <button
                onClick={() => setTerminalOutput('[Console Cleared]\n')}
                className={`text-[10px] font-bold ${isDarkTheme ? 'text-slate-400 hover:text-slate-200' : 'text-[#8C7A6B] hover:text-[#2C221E]'}`}
              >
                Clear Output
              </button>
            </div>

            {/* Terminal Window */}
            <div className={`p-4 rounded-2xl border font-mono text-[11px] h-[400px] overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-inner ${
              isDarkTheme ? 'bg-slate-950 border-slate-800 text-emerald-400' : 'bg-[#F5EFE4] border-[#E6DCCB] text-[#2C221E]'
            }`}>
              {terminalOutput}
            </div>

            <div className={`p-3 rounded-xl border text-[10px] space-y-1 ${
              isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-[#FAF4EA] border-[#E8DFC8] text-[#6E615A]'
            }`}>
              <span className="font-bold text-[#B88037] block">Architecture Verification:</span>
              <p>As documented in Chapter 7.17, these Python modules power speech recognition, RAG vector similarity search, and ReportLab PDF compilation.</p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
