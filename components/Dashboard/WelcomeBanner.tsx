"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function WelcomeBanner() {
  const { user } = useUser();
  return (
    <div className="p-6 md:p-8 bg-gradient-to-r from-blue-600 to-blue-700 w-full text-white rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-6 w-full">
      
      
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-3">
        <h1 className="font-bold text-2xl md:text-3xl">
          Welcome back, {user?.firstName || 'Student'}! 👋
        </h1>
        </div>
        <p className="text-white/80 text-sm md:text-base max-w-2xl">
        Ready to continue your learning journey? You're doing great! Keep up the momentum and explore our latest courses.
        </p>
      </div>
      </div>
      
      
    </div>
  );
}
