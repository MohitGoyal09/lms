import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content and Footer */}
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1">{children}</div>
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </div>
  );
}
