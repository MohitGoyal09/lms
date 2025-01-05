import React from "react";
import { CourseLayout } from "@/Types/course";
import { BookOpenCheck } from "lucide-react";
export default function ChapterList({
  courseLayout,
}: {
  courseLayout: CourseLayout;
}) {
  const Chapters = courseLayout.chapters;
  return (
<div className="p-6">
  <ul className="space-y-6"></ul>
    <ul className="space-y-6">
        {Chapters.map((chapter) => (
            <li key={chapter.chapter_number} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                    <BookOpenCheck className="w-6 h-6 text-primary shrink-0" />
                    <h2 className="text-xl font-semibold dark:text-white">Chapter {chapter.chapter_number}: {chapter.chapter_title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{chapter.chapter_summary}</p>
                <ul className="space-y-2 pl-10">
                    {chapter.topics.map((topic, index) => (
                        <li key={index} className="text-gray-700 dark:text-gray-300 list-disc">
                            {topic}
                        </li>
                    ))}
                </ul>
            </li>
        ))}
    </ul>
</div>
  );
}
