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
          <h2 className="text-2xl font-bold">
            {course?.courseLayout?.course_title || "No Title Available"}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-gray-600" />
          <p className="text-gray-600">
            {course?.courseLayout?.course_summary || "No Summary Available"}
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm text-gray-500">Course Progress</label>
          <Progress
            value={course?.courseLayout?.chapters.length || 0}
            max={10}
            className="h-2"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium">
              Chapters: {course?.courseLayout?.chapters.length || 0}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <BarChart2 className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium">
              Difficulty:{" "}
              {course?.courseLayout?.difficulty || "No Difficulty Set"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
