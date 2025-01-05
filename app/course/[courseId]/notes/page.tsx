"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ChapterNotes {
  chapter_number: number;
  chapter_title: string;
  chapter_summary: string;
  topics: string[];
  notes: {
    html_content: string;
  };
}

interface NotesResponse {
  id: number;
  courseId: string;
  chapterId: number;
  notes: string; }

function ViewNotes() {
  const { courseId } = useParams();
  const [notesData, setNotesData] = useState<ChapterNotes[]>([]);
  const [currentNoteIndex, setCurrentNoteIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const GetNotes = async () => {
    try {
      const result = await axios.post<NotesResponse[]>("/api/study-type", {
        courseId: courseId,
        studyType: "notes",
      });
      console.log("API Response:", result.data);

      const parsedNotes = result.data
        .map((chapter) => {
          try {
            const notesString = chapter.notes.replace(/^"(.*)"$/, "$1");
            const parsedChapterNotes = JSON.parse(notesString)[0];
            return parsedChapterNotes;
          } catch (e) {
            console.error("Error parsing notes for chapter:", chapter.id, e);
            return null;
          }
        })
        .filter((note): note is ChapterNotes => note !== null)
        .sort((a, b) => a.chapter_number - b.chapter_number);

      // Check for missing chapters and insert dummy data
      const minChapter = parsedNotes[0]?.chapter_number || 0;
      const maxChapter =
        parsedNotes[parsedNotes.length - 1]?.chapter_number || 0;
      for (let i = minChapter; i <= maxChapter; i++) {
        const chapter = parsedNotes.find((note) => note.chapter_number === i);
        if (!chapter) {
          // Insert dummy chapter
          parsedNotes.splice(i - minChapter, 0, {
            chapter_number: i,
            chapter_title: `Chapter ${i}`,
            chapter_summary: `Summary for Chapter ${i}`,
            topics: [`Topic 1 for Chapter ${i}`],
            notes: {
              html_content: `<h2>Chapter ${i}</h2><p>Content for Chapter ${i}</p>`,
            },
          });
        }
      }

      setNotesData(parsedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotesData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetNotes();
  }, []);

  const handlePrevNote = () => {
    if (currentNoteIndex > 0 && notesData.length > 0) {
      setCurrentNoteIndex(currentNoteIndex - 1);
    }
  };

  const handleNextNote = () => {
    if (notesData.length > 0 && currentNoteIndex < notesData.length - 1) {
      setCurrentNoteIndex(currentNoteIndex + 1);
    }
  };


  const decodeHtmlContent = (content: string) => {
    return content
      .replace(/\\n/g, "\n")
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\&/g, "&")
      .replace(/\\;/g, ";");
  };

  if (loading) {
    return <p>Loading notes...</p>;
  }

  if (notesData.length === 0) {
    return <p>No notes available.</p>;
  }

  const currentNote = notesData[currentNoteIndex];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center gap-6 mb-8">
      
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex items-center justify-between">
        <button
        onClick={handlePrevNote}
        disabled={currentNoteIndex === 0}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105
        ${currentNoteIndex === 0 
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
        }`}
        >
        <span className="text-lg">←</span> Previous
        </button>
        
        <div className="flex flex-col items-center">
        <span className="text-lg font-bold text-gray-700 dark:text-gray-200">
          Chapter {currentNote.chapter_number}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          of {notesData[notesData.length - 1].chapter_number} chapters
        </span>
        </div>

        <button
        onClick={handleNextNote}
        disabled={currentNoteIndex === notesData.length - 1}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 transform hover:scale-105
        ${currentNoteIndex === notesData.length - 1
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
        }`}
        >
        Next <span className="text-lg">→</span>
        </button>
      </div>

      
      <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-4">
        {currentNote.chapter_title}
        </h1>
        <div 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-800 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400"
        dangerouslySetInnerHTML={{
          __html: decodeHtmlContent(currentNote.notes.html_content),
        }}
        />
      </div>
      </div>
    </div>
  );
}

export default ViewNotes;
