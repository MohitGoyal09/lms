import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Footer from "@/components/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="h-full grid grid-cols-sidebar">
        {/* Sidebar */}
        <aside className="col-start-1 col-end-2">
          <AppSidebar />
        </aside>

        {/* Main Content and Footer */}
        <main className="col-start-2 col-end-4 flex flex-col">
          <DashboardHeader />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </main>
      </div>
    </SidebarProvider>
  );
}
