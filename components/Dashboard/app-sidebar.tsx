"use client";
import React, { useContext, useState } from "react";
import { LayoutDashboard, Shield, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CourseCountContext } from "@/app/_context/CourseCountContext";


const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "UpGrade",
    url: "/dashboard/upgrade",
    icon: Shield,
  },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const context = useContext(CourseCountContext);
  const courseCount = context?.courseCount ?? 0;
  const setCourseCount = context?.setCourseCount ?? (() => {});
  return (
    <div
      className={`hidden md:flex h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border/50 transition-all duration-200 flex-col ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-2 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-muted/80"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {isOpen && (
          <div className="flex items-center gap-2">
            <span className="font-bold text-xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-blue-600 bg-clip-text text-transparent">
              Artificial Guruji
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="px-3 py-2 flex-1">
        <Link href="/create">
          <Button className="bg-blue-600 w-full mb-4">
            {isOpen ? "+ Create New" : "+"}
          </Button>
        </Link>

        <nav className="space-y-1">
          {items.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted/80 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {isOpen && <span className="font-medium">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      {isOpen && (
        <div className="p-4 shrink-0">
          <div className="p-4 border border-border/40 shadow-sm text-sm flex flex-col gap-3 rounded-lg bg-slate-100 dark:bg-slate-900">
            <h2 className="font-semibold text-md">
              Available Courses : {5 - courseCount}
            </h2>
            <Progress value={(courseCount / 5) * 100} className="h-2" />
            <h2 className="text-xs text-slate-600 dark:text-slate-400">
              {courseCount} out of 5 Tokens Used
            </h2>
            <Link
              href="/dashboard/upgrade"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-xs mt-1"
            >
              Upgrade to create more
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
