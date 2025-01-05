import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
// import { ModeToggle } from "../Toggle";

export default function DashboardHeader() {
  return (
    <header className="w-full border-b border-gray-200 bg-white flex items-center justify-between px-4 sm:px-6">
      <div className="flex h-16 items-center justify-between w-full">
        
        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Artifical Guruji
          </Link>
        </div>
        {/* <ModeToggle/> */}
        <UserButton />
      </div>
    </header>
  );
}
