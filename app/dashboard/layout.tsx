import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Dashboard/app-sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-full w-full">
        <div>
          {/* <SidebarTrigger /> */}
          <AppSidebar />
        </div>
        <main className="flex-1">
          <DashboardHeader />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
