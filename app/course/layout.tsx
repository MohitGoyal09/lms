import React from "react";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Footer from "@/components/Footer";
export default function CourseViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashboardHeader />
      {children}
      <Footer />
    </div>
  );
}
