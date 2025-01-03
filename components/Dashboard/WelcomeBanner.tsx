"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function WelcomeBanner() {
  const { user } = useUser();
  return (
    <div className="p-4 md:p-6 bg-blue-600 w-full text-white rounded-lg flex flex-col md:flex-row items-center gap-4 md:gap-6 shadow-md">
      <div className="flex flex-col md:flex-row items-center w-full gap-4">
      <Image
        src="/laptop.png"
        alt="laptop"
        width={120}
        height={120}
        className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0"
      />
      <div className="flex flex-col gap-2 text-center md:text-left w-full">
        <div className="font-bold text-xl md:text-3xl">
        Hello, {user?.fullName}
        </div>
        <p className="text-xs md:text-base">
        Welcome back! It's time to start learning new courses.
        </p>
      </div>
      </div>
    </div>
  );
}
