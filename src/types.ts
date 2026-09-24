export interface User {
  User_ID: number;
  Name: string;
  Email: string;
  Role: string;
}

export interface ActionItem {
  id: string;
  task: string;
  assignee: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export interface VectorChunk {
  chunkId: string;
  text: string;
  source: string;
  embedding: number[];
  similarityScore?: number;
  category: string;
}

export interface MeetingTranscript {
  Transcript_ID: number;
  Meeting_ID: number;
  Transcript_Text: string;
  Summary: string;
  KeyTakeaways: string[];
  ActionItems: ActionItem[];
  Speakers?: { timestamp: string; speaker: string; text: string }[];
}

export interface Meeting {
  Meeting_ID: number;
  User_ID: number;
  Meeting_Title: string;
  Meeting_Date: string;
  Duration: number; // in minutes
  Audio_File: string;
  Status: 'recorded' | 'transcribing' | 'completed';
  Room_Code?: string;
  Transcript?: MeetingTranscript;
}

export interface DocumentFile {
  Document_ID: number;
  Meeting_ID: number;
  File_Name: string;
  File_Type: 'pdf' | 'docx' | 'txt';
  Upload_Date: string;
  ChunkCount: number;
  Chunks: VectorChunk[];
}

export interface AIQuery {
  Query_ID: number;
  User_ID: number;
  Question: string;
  AI_Response: string;
  Timestamp: string;
  RetrievedChunks: VectorChunk[];
}

export interface PythonCodeModule {
  id: string;
  filename: string;
  title: string;
  description: string;
  code: string;
}

export interface DatabaseTable {
  tableName: string;
  description: string;
  columns: { name: string; type: string; isPK?: boolean; isFK?: boolean; description: string }[];
  rows: Record<string, any>[];
}
