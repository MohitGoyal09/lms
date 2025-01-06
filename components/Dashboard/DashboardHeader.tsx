"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../Toggle";
import { Bell, Menu, LayoutDashboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function DashboardHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            {showMobileMenu && (
              <div className="fixed inset-x-0 top-16 border-b bg-background p-4">
                <Link
                  href="/dashboard"
                  className={cn(
                    "mb-2 flex items-center gap-2 rounded-md px-4 py-2 hover:bg-muted",
                    pathname === "/dashboard" && "bg-muted"
                  )}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/upgrade"
                  className={cn(
                    "flex items-center gap-2 rounded-md px-4 py-2 hover:bg-muted",
                    pathname === "/dashboard/upgrade" && "bg-muted"
                  )}
                >
                  <Shield className="h-5 w-5" />
                  <span>Upgrade</span>
                </Link>
              </div>
            )}
          </div>

          <Link href="/" className="flex items-center hover:opacity-80">
            <span className="text-xl font-bold text-primary">
              Artificial Guruji
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 hover:bg-muted",
                pathname === "/dashboard" && "bg-muted"
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-muted"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-background" />
          </Button>
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}
