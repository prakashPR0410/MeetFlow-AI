import { Meeting, DocumentFile, PythonCodeModule, DatabaseTable } from '../types';

export const INITIAL_MEETINGS: Meeting[] = [
  {
    Meeting_ID: 101,
    User_ID: 24,
    Meeting_Title: "AI Meeting Intelligence Architecture & RAG Review",
    Meeting_Date: "2026-07-21",
    Duration: 42,
    Audio_File: "audio/meeting_101.mp3",
    Status: "completed",
    Transcript: {
      Transcript_ID: 501,
      Meeting_ID: 101,
      Transcript_Text: `Alex: Welcome everyone. Today we are reviewing the three-layer architecture for the AI Meeting Intelligence System. Sarah, could you update us on the Whisper speech recognition module?
Sarah: Thanks Alex. We integrated OpenAI's Whisper model. Audio files recorded in WAV or MP3 are chunked and converted into timestamped text. Transcription accuracy remains above 96% even with background noise.
David: Excellent. On the RAG side, we loaded the transcripts into LlamaIndex and FAISS vector database. Cosine similarity search retrieves the top-3 matching chunks in under 1.8 seconds.
Elena: I completed the SQLite3 database schema. We have tables for User, Meeting, Transcript, Document, AI_Query, and Report with full foreign key constraints.
Marcus: The ReportLab PDF generator is producing clean meeting summary PDFs with action items, participant lists, and timestamps.
Executive Director: Great progress team. Make sure the interface allows interactive live Python execution and real-time query retrieval.`,
      Summary: "The team presented progress on the AI-Powered Meeting Intelligence System. Whisper ASR achieves 96%+ transcription accuracy. LlamaIndex & FAISS perform RAG similarity search in <1.8s. SQLite database and ReportLab PDF generator are fully implemented.",
      KeyTakeaways: [
        "OpenAI Whisper integration completed with timestamped audio chunking.",
        "FAISS vector search achieves sub-2 second semantic context retrieval.",
        "SQLite database schema finalized with normalization up to 3NF.",
        "PDF report generation tested successfully using ReportLab."
      ],
      ActionItems: [
        {
          id: "act-1",
          task: "Implement interactive 3D Cream UI with tilt controls and WebGL canvas",
          assignee: "Alex Morgan",
          deadline: "2026-07-24",
          status: "completed"
        },
        {
          id: "act-2",
          task: "Integrate Pyodide / Python execution studio for live backend simulation",
          assignee: "David Miller",
          deadline: "2026-07-25",
          status: "in-progress"
        },
        {
          id: "act-3",
          task: "Optimize vector embedding chunk size to 512 tokens with 50 overlap",
          assignee: "Sarah Chen",
          deadline: "2026-07-26",
          status: "pending"
        }
      ],
      Speakers: [
        { timestamp: "00:00", speaker: "Alex Morgan", text: "Welcome everyone. Today we are reviewing the three-layer architecture." },
        { timestamp: "02:15", speaker: "Sarah Chen", text: "We integrated OpenAI Whisper. Audio files recorded are converted into text with 96%+ accuracy." },
        { timestamp: "05:40", speaker: "David Miller", text: "On RAG side, we loaded transcripts into LlamaIndex & FAISS vector DB. Retrieval takes under 1.8s." },
        { timestamp: "09:10", speaker: "Elena Rostova", text: "SQLite3 schema completed with full foreign key constraints and 3NF normalization." },
        { timestamp: "12:30", speaker: "Marcus Vance", text: "ReportLab PDF generator is producing meeting summary PDFs." }
      ]
    }
  },
  {
    Meeting_ID: 102,
    User_ID: 1,
    Meeting_Title: "Sprint Planning: Module 3 Whisper & RAG Pipeline",
    Meeting_Date: "2026-07-18",
    Duration: 28,
    Audio_File: "audio/sprint_planning.wav",
    Status: "completed",
    Transcript: {
      Transcript_ID: 502,
      Meeting_ID: 102,
      Transcript_Text: `David: In this sprint, our primary objective is optimizing the LangChain RAG pipeline with Gemini model integration.
Alex: Agreed. We need to ensure that when a user asks 'What was discussed regarding the project deadline?', the system retrieves exact document chunks without hallucination.
Sarah: I will write the python script for document loader using LlamaIndex for PDF and DOCX files.`,
      Summary: "Sprint planning focused on optimizing LangChain RAG pipeline, preventing LLM hallucinations, and supporting PDF/DOCX multi-format document uploads.",
      KeyTakeaways: [
        "Focus on zero-hallucination contextual answer generation via RAG.",
        "Support multi-document indexing for PDF, DOCX, and TXT files."
      ],
      ActionItems: [
        {
          id: "act-4",
          task: "Write document_loader.py for multi-format text extraction",
          assignee: "Sarah Chen",
          deadline: "2026-07-22",
          status: "completed"
        }
      ],
      Speakers: [
        { timestamp: "00:00", speaker: "David Miller", text: "In this sprint, our primary objective is optimizing RAG pipeline." },
        { timestamp: "03:10", speaker: "Alex Morgan", text: "Ensure zero-hallucination when users ask natural language questions." }
      ]
    }
  }
];

export const INITIAL_DOCUMENTS: DocumentFile[] = [
  {
    Document_ID: 301,
    Meeting_ID: 101,
    File_Name: "AI_Meeting_System_Report.pdf",
    File_Type: "pdf",
    Upload_Date: "2026-07-21",
    ChunkCount: 6,
    Chunks: [
      {
        chunkId: "chunk-101",
        text: "The system utilizes OpenAI Whisper for speech recognition, LlamaIndex for document chunking, and FAISS/ChromaDB for vector embedding storage.",
        source: "AI_Meeting_System_Report.pdf (Page 4)",
        category: "System Architecture",
        embedding: [0.12, 0.85, -0.34, 0.91, 0.45]
      },
      {
        chunkId: "chunk-102",
        text: "Retrieval-Augmented Generation (RAG) retrieves the top-K relevant transcript segments using cosine similarity before feeding context into LLM.",
        source: "AI_Meeting_System_Report.pdf (Page 9)",
        category: "RAG Pipeline",
        embedding: [0.42, 0.12, 0.77, -0.21, 0.63]
      },
      {
        chunkId: "chunk-103",
        text: "Database Schema is built on SQLite3 containing tables: USER, MEETING, TRANSCRIPT, DOCUMENT, AI_QUERY, and REPORT.",
        source: "AI_Meeting_System_Report.pdf (Page 70)",
        category: "Database Design",
        embedding: [-0.15, 0.64, 0.32, 0.88, -0.05]
      },
      {
        chunkId: "chunk-104",
        text: "Minimum Hardware Requirements: Intel Core i3 / AMD Ryzen 3, 8 GB RAM, Windows 10/11, Python 3.12+.",
        source: "AI_Meeting_System_Report.pdf (Page 24)",
        category: "Requirements",
        embedding: [0.08, -0.45, 0.21, 0.55, 0.72]
      }
    ]
  }
];

export const PYTHON_MODULES: PythonCodeModule[] = [
  {
    id: "whisper_engine",
    filename: "modules/whisper_engine.py",
    title: "Whisper Speech Recognition",
    description: "Converts meeting audio files into timestamped text transcripts using OpenAI Whisper model.",
    code: `import whisper
import os

class WhisperEngine:
    def __init__(self, model_size="base"):
        print(f"[WhisperEngine] Loading Whisper {model_size} model...")
        self.model = whisper.load_model(model_size)

    def transcribe_audio(self, audio_path: str):
        if not os.path.exists(audio_path):
            raise FileNotFoundError(f"Audio file not found: {audio_path}")
        
        print(f"[WhisperEngine] Processing {audio_path}...")
        result = self.model.transcribe(audio_path)
        
        transcript_data = {
            "text": result["text"],
            "segments": [
                {"start": seg["start"], "end": seg["end"], "text": seg["text"]}
                for seg in result.get("segments", [])
            ]
        }
        print(f"[WhisperEngine] Transcription complete ({len(result['text'])} chars)")
        return transcript_data

# Quick execution demo
if __name__ == "__main__":
    engine = WhisperEngine("tiny")
    print("Engine initialized successfully!")
`
  },
  {
    id: "vector_store",
    filename: "modules/vector_store.py",
    title: "ChromaDB / FAISS Vector Store",
    description: "Generates embeddings and performs cosine similarity search over chunked transcripts and documents.",
    code: `import numpy as np

class VectorStore:
    def __init__(self):
        self.vectors = []
        self.documents = []

    def add_document(self, doc_id: str, text: str, category: str):
        # Simulated 5D dense embedding generator
        embedding = np.random.randn(5).tolist()
        doc = {
            "doc_id": doc_id,
            "text": text,
            "category": category,
            "embedding": embedding
        }
        self.documents.append(doc)
        print(f"[VectorStore] Indexed chunk '{doc_id}' ({category})")

    def similarity_search(self, query: str, top_k: int = 3):
        print(f"[VectorStore] Performing semantic search for: '{query}'")
        results = []
        for doc in self.documents:
            score = round(float(np.random.uniform(0.82, 0.98)), 4)
            results.append({**doc, "similarityScore": score})
        
        results.sort(key=lambda x: x["similarityScore"], reverse=True)
        return results[:top_k]

if __name__ == "__main__":
    db = VectorStore()
    db.add_document("chunk-1", "Meetings discuss budget allocation for Module 3", "Finance")
    db.add_document("chunk-2", "David assigned to RAG pipeline optimization", "Tasks")
    res = db.similarity_search("Who is working on RAG?")
    for r in res:
        print(f"Match score {r['similarityScore']}: {r['text']}")
`
  },
  {
    id: "ai_chat",
    filename: "modules/ai_chat.py",
    title: "RAG AI Chat Assistant (LangChain)",
    description: "Orchestrates retrieved vector context with Large Language Model to answer natural language meeting queries.",
    code: `class RAGChatAssistant:
    def __init__(self, vector_store):
        self.vector_store = vector_store

    def ask(self, user_question: str):
        # 1. Retrieve Context
        chunks = self.vector_store.similarity_search(user_question, top_k=2)
        context_str = "\\n".join([f"- {c['text']} (Source: {c['category']})" for c in chunks])
        
        # 2. Prompt Construction
        prompt = f"""
You are an AI Meeting Intelligence Assistant. Answer the question using ONLY the retrieved meeting context.

Retrieved Context:
{context_str}

User Question: {user_question}
Answer:"""

        print(f"[RAGChatAssistant] Generated RAG Prompt:\\n{prompt}")
        
        # Simulated LLM Answer Generation
        answer = f"Based on the meeting records, {chunks[0]['text']}. Action items have been recorded in the database."
        return {
            "answer": answer,
            "retrieved_chunks": chunks
        }

if __name__ == "__main__":
    print("RAG Pipeline initialized!")
`
  },
  {
    id: "report_generator",
    filename: "modules/report_generator.py",
    title: "ReportLab PDF Generator",
    description: "Generates formatted PDF meeting reports containing transcripts, summaries, and assigned action items.",
    code: `import datetime

class PDFReportGenerator:
    def generate_report(self, meeting_title: str, summary: str, action_items: list):
        report_data = {
            "title": meeting_title,
            "generated_at": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "summary": summary,
            "action_items_count": len(action_items),
            "status": "PDF Compiled Successfully"
        }
        print(f"[ReportLab] PDF Report created for '{meeting_title}' with {len(action_items)} action items.")
        return report_data

if __name__ == "__main__":
    gen = PDFReportGenerator()
    gen.generate_report("Project Review", "All tasks completed.", ["Task 1", "Task 2"])
`
  },
  {
    id: "database",
    filename: "modules/database.py",
    title: "SQLite3 Database Operations",
    description: "Manages CRUD operations for Users, Meetings, Transcripts, Documents, and Reports.",
    code: `import sqlite3

class DatabaseManager:
    def __init__(self, db_path="database/meeting.db"):
        self.db_path = db_path
        self.init_db()

    def init_db(self):
        print(f"[SQLite] Initializing database at {self.db_path}...")
        # Tables: USER, MEETING, TRANSCRIPT, DOCUMENT, AI_QUERY, REPORT
        print("[SQLite] Schema initialized according to 3NF standards.")

if __name__ == "__main__":
    db = DatabaseManager()
`
  }
];

export const DATABASE_TABLES: DatabaseTable[] = [
  {
    tableName: "USER",
    description: "Stores user accounts and authentication credentials.",
    columns: [
      { name: "User_ID", type: "INTEGER", isPK: true, description: "Primary Key" },
      { name: "Name", type: "TEXT", description: "User's full name" },
      { name: "Email", type: "TEXT", description: "Unique email address" },
      { name: "Password", type: "TEXT", description: "Encrypted password hash" },
      { name: "Created_Date", type: "DATE", description: "Registration timestamp" }
    ],
    rows: [
      { User_ID: 1, Name: "Alex Morgan", Email: "alex.morgan@meetflow.ai", Password: "********(bcrypt)", Created_Date: "2026-07-01" },
      { User_ID: 2, Name: "David Miller", Email: "david.miller@meetflow.ai", Password: "********(bcrypt)", Created_Date: "2026-07-01" },
      { User_ID: 3, Name: "Sarah Chen", Email: "sarah.chen@meetflow.ai", Password: "********(bcrypt)", Created_Date: "2026-07-01" }
    ]
  },
  {
    tableName: "MEETING",
    description: "Stores recorded meeting sessions.",
    columns: [
      { name: "Meeting_ID", type: "INTEGER", isPK: true, description: "Primary Key" },
      { name: "User_ID", type: "INTEGER", isFK: true, description: "Foreign Key -> USER.User_ID" },
      { name: "Meeting_Title", type: "TEXT", description: "Title of the meeting" },
      { name: "Meeting_Date", type: "DATE", description: "Date of session" },
      { name: "Duration", type: "INTEGER", description: "Duration in minutes" },
      { name: "Audio_File", type: "TEXT", description: "Path to stored audio" }
    ],
    rows: [
      { Meeting_ID: 101, User_ID: 1, Meeting_Title: "AI Meeting Intelligence Architecture & RAG Review", Meeting_Date: "2026-07-21", Duration: 42, Audio_File: "audio/meeting_101.mp3" },
      { Meeting_ID: 102, User_ID: 1, Meeting_Title: "Sprint Planning: Module 3 Whisper & RAG Pipeline", Meeting_Date: "2026-07-18", Duration: 28, Audio_File: "audio/sprint_planning.wav" }
    ]
  },
  {
    tableName: "TRANSCRIPT",
    description: "Stores speech-to-text output and AI summaries.",
    columns: [
      { name: "Transcript_ID", type: "INTEGER", isPK: true, description: "Primary Key" },
      { name: "Meeting_ID", type: "INTEGER", isFK: true, description: "Foreign Key -> MEETING.Meeting_ID" },
      { name: "Transcript_Text", type: "TEXT", description: "Speech recognition text" },
      { name: "Summary", type: "TEXT", description: "AI generated meeting summary" }
    ],
    rows: [
      { Transcript_ID: 501, Meeting_ID: 101, Transcript_Text: "Alex: Welcome everyone...", Summary: "The team presented progress on AI Meeting Intelligence..." }
    ]
  }
];
