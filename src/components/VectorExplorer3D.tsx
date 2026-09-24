import React, { useState } from 'react';
import { Network, Upload, FileCode, CheckCircle2, Layers, Database, Sparkles, RefreshCw } from 'lucide-react';
import { ThreeVectorGraph } from './ThreeVectorGraph';
import { DocumentFile, VectorChunk } from '../types';

interface VectorExplorer3DProps {
  documents: DocumentFile[];
  onUploadDocument: (doc: DocumentFile) => void;
  isDarkTheme?: boolean;
}

export const VectorExplorer3D: React.FC<VectorExplorer3DProps> = ({
  documents,
  onUploadDocument,
  isDarkTheme = false,
}) => {
  const allChunks = documents.flatMap((d) => d.Chunks);
  const [selectedChunk, setSelectedChunk] = useState<VectorChunk | null>(allChunks[0] || null);
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDocumentUpload = () => {
    if (!fileName.trim()) return;
    setIsProcessing(true);

    setTimeout(() => {
      const newDoc: DocumentFile = {
        Document_ID: Math.floor(300 + Math.random() * 500),
        Meeting_ID: 101,
        File_Name: fileName.endsWith('.pdf') || fileName.endsWith('.txt') ? fileName : `${fileName}.pdf`,
        File_Type: fileName.endsWith('.txt') ? 'txt' : 'pdf',
        Upload_Date: new Date().toISOString().split('T')[0],
        ChunkCount: 2,
        Chunks: [
          {
            chunkId: `chunk-${Date.now()}-1`,
            text: fileContent || `Document '${fileName}' indexed into LlamaIndex and vector database with 512-token overlap chunking.`,
            source: fileName,
            category: "Uploaded Doc",
            embedding: [Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5],
          },
        ],
      };

      onUploadDocument(newDoc);
      setSelectedChunk(newDoc.Chunks[0]);
      setFileName('');
      setFileContent('');
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold tracking-tight flex items-center gap-2 ${
            isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'
          }`}>
            <Network className="w-6 h-6 text-[#D49B53]" /> 3D ChromaDB Vector Space & Document Indexer
          </h2>
          <p className={`text-xs ${isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'}`}>
            Visualize high-dimensional meeting embeddings floating in 3D WebGL space. Click any 3D node to inspect its exact text and vector representation.
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
          isDarkTheme ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' : 'clay-pill text-[#B88037] border-[#E6DCCB]'
        }`}>
          Module: document_loader.py & vector_store.py
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 3D Vector WebGL Canvas */}
        <div className="lg:col-span-8 space-y-4">
          <ThreeVectorGraph
            chunks={allChunks}
            onSelectChunk={(chunk) => setSelectedChunk(chunk)}
            selectedChunkId={selectedChunk?.chunkId}
            isDarkTheme={isDarkTheme}
          />

          {/* Selected Chunk Details Card */}
          {selectedChunk && (
            <div className={`p-5 space-y-3 rounded-2xl border ${
              isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'clay-card'
            }`}>
              <div className={`flex items-center justify-between border-b pb-2 ${
                isDarkTheme ? 'border-slate-800' : 'border-[#E8DFC8]'
              }`}>
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#D49B53]" />
                  <span className={`text-xs font-bold ${isDarkTheme ? 'text-slate-200' : 'text-[#2C221E]'}`}>
                    Chunk Inspection: <span className="text-[#B88037]">{selectedChunk.chunkId}</span>
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                  isDarkTheme ? 'bg-emerald-500/20 text-emerald-300' : 'clay-pill text-[#3B7A57]'
                }`}>
                  Category: {selectedChunk.category}
                </span>
              </div>

              <p className={`text-xs leading-relaxed font-medium p-3 rounded-xl border ${
                isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-[#FFFDF9] border-[#E8DFC8] text-[#2C221E]'
              }`}>
                "{selectedChunk.text}"
              </p>

              <div className={`flex flex-wrap items-center justify-between gap-2 text-[11px] ${
                isDarkTheme ? 'text-slate-400' : 'text-[#6E615A]'
              }`}>
                <div>
                  <span className={`font-semibold ${isDarkTheme ? 'text-slate-300' : 'text-[#8C7A6B]'}`}>Source Document:</span> {selectedChunk.source}
                </div>
                <div className={`font-mono text-[10px] px-2 py-1 rounded-md border ${
                  isDarkTheme ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-[#F5EFE4] border-[#E6DCCB]'
                }`}>
                  Embedding Array: [{selectedChunk.embedding?.slice(0, 3).map((v) => v.toFixed(2)).join(', ')}, ...]
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Upload New Document & Document List */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upload Card */}
          <div className={`p-5 space-y-4 rounded-2xl border ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'clay-card'
          }`}>
            <h3 className={`font-bold text-sm flex items-center gap-2 ${
              isDarkTheme ? 'text-slate-100' : 'text-[#2C221E]'
            }`}>
              <Upload className="w-4 h-4 text-[#D49B53]" /> Upload Document (LlamaIndex)
            </h3>

            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${
                isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'
              }`}>
                Document Name (.pdf, .docx, .txt)
              </label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="e.g. Meeting_Minutes_Sprint3.pdf"
                className={`w-full px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#D49B53] ${
                  isDarkTheme
                    ? 'bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500'
                    : 'clay-input text-[#2C221E]'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[11px] font-semibold mb-1 ${
                isDarkTheme ? 'text-slate-300' : 'text-[#6E615A]'
              }`}>
                Document Text Content / Notes
              </label>
              <textarea
                value={fileContent}
                onChange={(e) => setFileContent(e.target.value)}
                rows={3}
                placeholder="Paste key document content to split into vector chunks..."
                className={`w-full px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#D49B53] ${
                  isDarkTheme
                    ? 'bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500'
                    : 'clay-input text-[#2C221E]'
                }`}
              />
            </div>

            <button
              onClick={handleDocumentUpload}
              disabled={!fileName.trim() || isProcessing}
              className="w-full clay-button-gold py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Indexing & Vectorizing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Index into 3D Vector Store
                </>
              )}
            </button>
          </div>

          {/* Indexed Documents List */}
          <div className={`p-5 space-y-3 rounded-2xl border ${
            isDarkTheme ? 'bg-slate-900/80 border-slate-800 text-slate-100' : 'clay-card'
          }`}>
            <h3 className={`font-bold text-sm flex items-center gap-2 border-b pb-2 ${
              isDarkTheme ? 'text-slate-100 border-slate-800' : 'text-[#2C221E] border-[#E8DFC8]'
            }`}>
              <FileCode className="w-4 h-4 text-[#B88037]" /> Indexed Documents ({documents.length})
            </h3>

            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {documents.map((doc) => (
                <div
                  key={doc.Document_ID}
                  className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                    isDarkTheme
                      ? 'bg-slate-950 border-slate-800 text-slate-100'
                      : 'bg-[#FFFDF9] border-[#E8DFC8] text-[#2C221E]'
                  }`}
                >
                  <div>
                    <div className="font-bold truncate max-w-[160px]">{doc.File_Name}</div>
                    <div className={`text-[10px] ${isDarkTheme ? 'text-slate-400' : 'text-[#8C7A6B]'}`}>{doc.Upload_Date} • {doc.ChunkCount} Vector Chunks</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                    isDarkTheme ? 'bg-purple-500/20 text-purple-300' : 'clay-pill text-[#D49B53]'
                  }`}>
                    {doc.File_Type}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
