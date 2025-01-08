import React from "react";
import { ModeToggle } from "../Toggle";
import { Button } from "../ui/button";
import { Github, Twitter, X, Menu } from "lucide-react";
import Link from "next/link";
import PulsatingButton from "@/components/ui/pulsating-button";
import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <header className="w-full border-b border-gray-100/10 dark:border-gray-800/50 backdrop-blur-xl fixed top-0 z-50 bg-white/75 dark:bg-black/40">
      <div className="container mx-auto px-2 sm:px-4 h-[4.5rem] flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-sm sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 cursor-pointer">
            Artifical Guruji
          </h1>
        </div>

        <div className="flex items-center gap-x-2 sm:gap-x-4">
          <div className="hidden sm:flex items-center gap-x-2 sm:gap-x-4">
            <Link
              href="https://github.com/MohitGoyal09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link
              href="https://x.com/ByteMohit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
          <ModeToggle />
          <div className="flex items-center gap-x-1 sm:gap-x-3">
            {!isSignedIn ? (
              <>
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="px-2 sm:px-4 text-xs sm:text-sm font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <PulsatingButton className="px-2 sm:px-4 text-xs sm:text-sm">
                    Sign Up
                  </PulsatingButton>
                </Link>
              </>
            ) : (
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="px-2 sm:px-4 text-xs sm:text-sm font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all duration-200 border border-gray-200 dark:border-gray-800"
                >
                  Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
