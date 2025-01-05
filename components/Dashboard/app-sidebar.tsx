"use client";
import {
  CircleUserRound,
  Settings,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import Image from "next/image";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";

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
  return (
    <Sidebar className="flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarHeader className="font-bold text-xl px-6 py-4 flex flex-row items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={20}
          height={20}
          className="mr-2"
        />
        <span>Artificial Guruji</span>
      </SidebarHeader>
      <SidebarContent className="flex-grow px-3">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <Link href="/create">
              <div className="mb-4 w-full">
                <Button className="bg-blue-600 w-full">+ Create New</Button>
              </div>
              </Link>
              {items.map((item) => (
                <SidebarMenuItem
                  className="h-12 mb-1 transition-colors hover:bg-slate-200 rounded-lg"
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 px-4"
                    >
                      <item.icon className="h-5 w-5 font-bold" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4 pb-6 border bg-slate-100 rounded-lg">
        <div className="p-4 border border-border/40 shadow-sm text-sm flex flex-col gap-3 rounded-lg bg-card">
          <h2 className="font-semibold text-md">Total Usage</h2>
          <Progress value={55} className="h-2 " />
          <h2 className="text-xs text-muted-foreground">
            5 out of 10 Tokens Used
          </h2>
          <Link
            href={"/dashboard/upgrade"}
            className="text-blue-800 text-xs mt-1"
          >
            Upgrade to create more
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
