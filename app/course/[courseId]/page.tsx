"use client";
import { useParams } from "next/navigation";
import axios from "axios";
import React, { useState, useEffect } from "react";
import CourseIntro from "@/components/Course/CourseIntro";
import { Course } from "@/Types/course";
import StudyMaterial from "@/components/Course/StudyMaterial";
import ChapterList from "@/components/Course/ChapterList";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursePage() {
  const { courseId } = useParams();
  const [courseState, setCourseState] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    if (courseId) {
      GetCourse();
    }
  }, [courseId]);

  const GetCourse = async () => {
    try {
      const result = await axios.get("/api/courses", {
        params: {
          courseId: courseId,
        },
      });

      if (result.data.course && Array.isArray(result.data.course)) {
        if (result.data.course.length > 0) {
          const courseData = result.data.course[0];

          if (typeof courseData.courseLayout === "string") {
            courseData.courseLayout = JSON.parse(courseData.courseLayout);
          }
          setCourse(courseData);
          setCourseState("success");
        } else {
          setError("Course not found");
          setCourseState("error");
        }
      } else {
        setError("Invalid course data format");
        setCourseState("error");
      }
    } catch (error) {
      setError(error);
      setCourseState("error");
    }
  };

  if (courseState === "loading") {
    return (
      <div>
        <div className="mx-10 md:mx-36 lg:px-60 mt-10">
          
          <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
          </div>

          
          <div className="mt-10">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
          </div>

         
          <div className="mt-10 space-y-4">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    );
  } else if (courseState === "error") {
    return (
      <div>
        <div className="mx-10 md:mx-36 lg:px-60 mt-10">
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg"></div>
        <p className="text-red-600 font-medium text-center">
          Error fetching course data. Please try again later.
        </p>
          </div>
        </div>
      
    );
  } else if (courseState === "success") {
    console.log(course);
    return (
      <div>
        <div className="mx-10 md:mx-42 lg:px-60 mt-10">
          {course && <CourseIntro course={course} />}
          <h1 className="text-2xl font-bold mb-6 mt-10">Study Material</h1>
          {courseId && (
            <StudyMaterial
              courseId={Array.isArray(courseId) ? courseId[0] : courseId}
            />
          )}
          {course && <ChapterList courseLayout={course.courseLayout} />}
        </div>
      </div>
    );
  }
}
