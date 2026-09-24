import React, { useState } from 'react';
import { FileSpreadsheet, Download, Sparkles, CheckCircle2, FileText, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';
import { Meeting } from '../types';

interface PDFReportGeneratorProps {
  meetings: Meeting[];
  isDarkTheme?: boolean;
}

export const PDFReportGenerator: React.FC<PDFReportGeneratorProps> = ({ meetings, isDarkTheme = false }) => {
  const [selectedMeetingId, setSelectedMeetingId] = useState<number>(meetings[0]?.Meeting_ID || 101);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedMeeting = meetings.find((m) => m.Meeting_ID === selectedMeetingId) || meetings[0];

  const handleExportPDF = () => {
    if (!selectedMeeting) return;
    setIsGenerating(true);

    try {
      const doc = new jsPDF();

      // Cream Header Banner
      doc.setFillColor(250, 246, 238); // #FAF6EE
      doc.rect(0, 0, 210, 297, 'F');

      // Title & Header Box
      doc.setFillColor(44, 34, 30); // #2C221E
      doc.rect(15, 15, 180, 28, 'F');

      doc.setTextColor(212, 155, 83); // #D49B53
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text("AI MEETING INTELLIGENCE REPORT", 20, 28);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 36);

      // Meeting Metadata Card
      doc.setFillColor(245, 239, 228);
      doc.roundedRect(15, 48, 180, 32, 4, 4, 'F');

      doc.setTextColor(44, 34, 30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Meeting: ${selectedMeeting.Meeting_Title}`, 20, 58);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Meeting ID: #${selectedMeeting.Meeting_ID}  |  Date: ${selectedMeeting.Meeting_Date}  |  Duration: ${selectedMeeting.Duration} mins`, 20, 68);
      doc.text(`Attendees: Alex Morgan (Chair), Sarah Chen (Audio ML), David Miller (RAG Architect), Marcus Vance (UI/UX)`, 20, 74);

      // AI Summary Section
      let currentY = 88;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(184, 128, 55);
      doc.text("EXECUTIVE SUMMARY (AI-GENERATED)", 15, currentY);

      currentY += 6;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(44, 34, 30);

      const summaryText = selectedMeeting.Transcript?.Summary || "No summary available.";
      const splitSummary = doc.splitTextToSize(summaryText, 180);
      doc.text(splitSummary, 15, currentY);

      currentY += splitSummary.length * 5 + 10;

      // Key Takeaways Section
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(184, 128, 55);
      doc.text("KEY TAKEAWAYS", 15, currentY);

      currentY += 6;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(44, 34, 30);

      const takeaways = selectedMeeting.Transcript?.KeyTakeaways || [];
      takeaways.forEach((kt, idx) => {
        const line = `${idx + 1}. ${kt}`;
        const splitLine = doc.splitTextToSize(line, 175);
        doc.text(splitLine, 20, currentY);
        currentY += splitLine.length * 5 + 2;
      });

      // Action Items Section
      currentY += 6;
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(184, 128, 55);
      doc.text("ACTION ITEMS & DELIVERABLES", 15, currentY);

      currentY += 6;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');

      const actionItems = selectedMeeting.Transcript?.ActionItems || [];
      actionItems.forEach((act) => {
        doc.setTextColor(44, 34, 30);
        const itemLine = `[${act.status.toUpperCase()}] ${act.task} (Assignee: ${act.assignee}, Due: ${act.deadline})`;
        const splitAct = doc.splitTextToSize(itemLine, 175);
        doc.text(splitAct, 20, currentY);
        currentY += splitAct.length * 5 + 2;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(140, 122, 107);
      doc.text("Report compiled by AI Meeting Intelligence System (ReportLab / jsPDF Engine) • Page 1 of 1", 15, 285);

      // Save PDF
      doc.save(`Meeting_Report_${selectedMeeting.Meeting_ID}.pdf`);

      // Trigger Confetti
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D49B53', '#B88037', '#FAF6EE']
      });

    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${
            isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'
          }`}>
            <FileSpreadsheet className="w-6 h-6 text-[#D49B53]" /> Automated PDF Report Generator
          </h2>
          <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
            Generates standardized executive meeting summary PDF documents matching Chapter 7.15 ReportLab requirements.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
          isDarkTheme ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' : 'clay-pill text-[#B88037] border-[#E6DCCB]'
        }`}>
          Module: report_generator.py & ReportLab
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Meeting Selection */}
        <div className="lg:col-span-5 space-y-4">
          <div className={`p-5 space-y-4 rounded-2xl border ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'clay-card'
          }`}>
            <h3 className={`font-bold text-sm border-b pb-2 ${
              isDarkTheme ? 'text-slate-100 border-slate-800' : 'text-[#2C221E] border-[#E8DFC8]'
            }`}>
              Select Meeting to Export
            </h3>

            <div className="space-y-3">
              {meetings.map((m) => {
                const isSelected = m.Meeting_ID === selectedMeetingId;
                return (
                  <button
                    key={m.Meeting_ID}
                    onClick={() => setSelectedMeetingId(m.Meeting_ID)}
                    className={`w-full text-left p-3.5 rounded-xl border transition ${
                      isSelected
                        ? isDarkTheme
                          ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                          : 'bg-[#2C221E] text-white border-[#2C221E]'
                        : isDarkTheme
                          ? 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                          : 'bg-[#FFFDF9] border-[#E8DFC8] hover:bg-[#F5EFE4]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className={isSelected ? 'text-[#D49B53] font-bold' : isDarkTheme ? 'text-slate-400 font-semibold' : 'text-[#8C7A6B] font-semibold'}>
                        #{m.Meeting_ID}
                      </span>
                      <span className={isSelected ? 'text-slate-200' : isDarkTheme ? 'text-slate-400' : 'text-slate-600'}>{m.Meeting_Date}</span>
                    </div>
                    <div className="font-bold text-xs leading-snug">{m.Meeting_Title}</div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleExportPDF}
              disabled={isGenerating}
              className="w-full clay-button-gold py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition hover:scale-[1.02]"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Compiling PDF...' : 'Download PDF Report'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: PDF Live Layout Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className={`p-6 space-y-5 border-2 border-dashed rounded-2xl ${
            isDarkTheme
              ? 'bg-slate-900/80 border-slate-800'
              : 'clay-card border-[#D9CFC0]'
          }`}>
            
            <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
              isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-[#FFFDF9] border-[#E8DFC8]'
            }`}>
              <div className="bg-[#2C221E] text-[#FAF6EE] p-4 rounded-xl flex items-center justify-between shadow">
                <div>
                  <h4 className="font-bold text-sm text-[#D49B53]">AI MEETING INTELLIGENCE REPORT</h4>
                  <p className="text-[10px] text-[#D9CFC0]">ReportLab Vector PDF Compiler</p>
                </div>
                <Printer className="w-5 h-5 text-[#D49B53]" />
              </div>

              <div className={`p-3 rounded-xl text-xs space-y-1 ${
                isDarkTheme ? 'bg-slate-900 text-slate-200 border border-slate-800' : 'bg-[#F5EFE4] text-[#2C221E]'
              }`}>
                <div className="font-bold">{selectedMeeting.Meeting_Title}</div>
                <div className={`text-[10px] ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
                  Session ID: #{selectedMeeting.Meeting_ID} • Date: {selectedMeeting.Meeting_Date} • Duration: {selectedMeeting.Duration} mins
                </div>
              </div>

              <div>
                <h5 className="text-[11px] font-bold text-[#B88037] uppercase tracking-wider mb-1">
                  Executive Summary:
                </h5>
                <p className={`text-xs leading-relaxed ${isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}`}>
                  {selectedMeeting.Transcript?.Summary}
                </p>
              </div>

              <div>
                <h5 className="text-[11px] font-bold text-[#B88037] uppercase tracking-wider mb-1">
                  Action Items ({selectedMeeting.Transcript?.ActionItems.length}):
                </h5>
                <div className={`space-y-1 text-xs ${isDarkTheme ? 'text-slate-300' : 'text-[#2C221E]'}`}>
                  {selectedMeeting.Transcript?.ActionItems.map((act) => (
                    <div key={act.id} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D49B53]" />
                      <span>{act.task} (<span className="font-semibold">{act.assignee}</span>)</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
