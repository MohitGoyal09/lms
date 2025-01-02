"use client";
import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

export default function WelcomeBanner() {
  const { user } = useUser();
  return (
    <div className="p-6 bg-blue-600 w-full text-white rounded-lg flex items-center gap-6 shadow-md">
      <Image
        src="/laptop.png"
        alt="laptop"
        width={120}
        height={120}
        className="flex-shrink-0"
      />
      <div className="flex flex-col gap-2 text-left">
        <div className="font-bold text-3xl">Hello, {user?.fullName}</div>
        <p className="text-base">
          Welcome back! It's time to start learning new courses.
        </p>
      </div>
    </div>
  );
}
