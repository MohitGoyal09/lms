import React from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function CourseViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  );
}
