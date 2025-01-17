import React from "react";
import { Course } from "@/Types/course";
import { Progress } from "../ui/progress";
import { BarChart2, BookOpen, FileText, Layers } from "lucide-react";

export default function CourseIntro({ course }: { course: Course }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <BookOpen className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold dark:text-white">
        {course?.courseLayout?.course_title || "No Title Available"}
        </h2>
      </div>

      <div className="flex items-center space-x-2">
        <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <p className="text-gray-600 dark:text-gray-300">
        {course?.courseLayout?.course_summary || "No Summary Available"}
        </p>
      </div>

      

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
        <Layers className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="font-medium dark:text-gray-200">
          Chapters: {course?.courseLayout?.chapters.length || 0}
        </h3>
        </div>

        <div className="flex items-center space-x-2">
        <BarChart2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        <h3 className="font-medium dark:text-gray-200">
          Difficulty:{" "}
          {course?.courseLayout?.difficulty || "No Difficulty Set"}
        </h3>
        </div>
      </div>
      </div>
    </div>
  );
}
