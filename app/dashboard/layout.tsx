"use client";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Footer from "@/components/Footer";
import { CourseCountContext } from "../_context/CourseCountContext";
import { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [courseCount, setCourseCount] = useState(0);
  return (
    <CourseCountContext.Provider value={{ courseCount, setCourseCount }}>
    <div className="h-full flex">
     
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1">{children}</div>
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </div>
    </CourseCountContext.Provider>
  );
}
