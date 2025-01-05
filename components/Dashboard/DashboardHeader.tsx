"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../Toggle";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">
              Artificial Guruji
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="text-sm font-medium hover:text-primary"
          >
            Dashboard
          </Link>
          <Link
            href="/courses"
            className="text-sm font-medium hover:text-primary"
          >
            Courses
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
          </Button>
          <ModeToggle />
          <UserButton/>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="space-y-1 px-4 py-3">
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
            >
              Dashboard
            </Link>
            <Link
              href="/courses"
              className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md"
            >
              Courses
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
