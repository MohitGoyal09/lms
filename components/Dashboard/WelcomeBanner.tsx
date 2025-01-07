"use client";
import React, { useContext } from "react";

import { useUser } from "@clerk/nextjs";
import { CourseCountContext } from "@/app/_context/CourseCountContext";


export default function WelcomeBanner() {
  const { user } = useUser();
   const courseContext = useContext(CourseCountContext);
    const courseCount = courseContext?.courseCount;
    const setCourseCount = courseContext?.setCourseCount;
  return (
    <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 w-full text-white rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-6 w-full">
      
      
      <div className="flex flex-col gap-2 flex-1">
      <div className="flex items-center gap-3">
      <h1 className="font-bold text-2xl md:text-3xl text-white dark:text-white">
      Welcome, {user?.firstName || 'Student'}! 🎉
      </h1>
      </div>
      <p className="text-white/80 dark:text-white/70 text-sm md:text-base max-w-2xl">
      {courseCount === 0 
      ? "We're excited to have you here! Start your learning journey by exploring our diverse collection of courses. Your path to knowledge begins now! 🌟"
      : "Ready to continue your learning journey? You're doing great! Keep up the momentum and explore our latest courses."}
      </p>
      </div>
      </div>
      
      
    </div>
  );
}
