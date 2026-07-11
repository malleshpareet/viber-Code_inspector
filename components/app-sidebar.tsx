"use client"
import React from 'react'
import { BookOpen, Settings, CreditCard, Moon, Sun, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useSession } from "@/lib/auth-client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link"
import Logout from '@/module/auth/components/logout'


const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.51 11.51 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.804 5.625-5.475 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)
export const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: BookOpen,
    },
    {
      title: "Repository",
      url: "/dashboard/repository",
      icon: GithubIcon,
    },

    {
      title: "Review",
      url: "/dashboard/reviews",
      icon: BookOpen,
    },
    {
      title: "Subscription",
      url: "/dashboard/subscription",
      icon: CreditCard,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const isActive = (url: string) => {
    return pathname === url || pathname.startsWith(url + "/dashboard");
  }

  if (!mounted || !session) return <Sidebar />

  const user = session.user;
  const userName = user?.name || "Guest";
  const userEmail = user?.email || "";
  const userInitials = userName.split(" ").map((n) => n[0]).join("").toUpperCase();
  const userAvatar = user?.image || "";


  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex flex-col gap-4 px-2 py-6">
          <div className="flex items-center gap-4 px-3 py-4 rounded-lg bg-sidebar-accent/50 hover:bg-sidebar-accent">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-primary-foreground">
              <GithubIcon className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground tracking-wide">
                Connected Account
              </p>
              <p className="text-sm font-medium text-sidebar-foreground/90">
                @{userName}
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6 flex-col gap-1">
        <div className="mb-2">
          <p className='text-xs font-semibold text-sidebar-foreground/60 px-3 mb-3 uppercase
        tracking-widget'>Menu</p>

        </div>
        <SidebarMenu className="gap-2">
          {navigationItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`h-11 px-4 rounded-lg transition-all duration-200 ${isActive(item.url)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                  : "hover:bg-sidebar-accent/60 text-sidebar-foreground"
                  }`}
              >
                <Link href={item.url} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarContent>
      <SidebarFooter className="border-t px-3 py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="h-12 px-4 rounded-lg data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors"
                >
                  <Avatar className="h-10 w-10 rounded-lg shrink-0">
                    <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                    <AvatarFallback className="rounded-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-relaxed min-w-0">
                    <span className="truncate font-semibold text-base">{userName}</span>
                    <span className="truncate text-xs text-sidebar-foreground/70">
                      {userEmail}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80 rounded-lg"
                align="end"
                side="right"
                sideOffset={8}
              >
                <div className="flex items-center gap-3 px-4 py-4 bg-sidebar-accent/30 rounded-t-lg">
                  <Avatar className="h-12 w-12 rounded-lg shrink-0">
                    <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                    <AvatarFallback className="rounded-lg">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm">{userName}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {userEmail}
                    </p>
                  </div>
                </div>
                <div className="px-2 py-3 border-t border-b">
                  <DropdownMenuItem asChild>
                    <button
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-full px-3 py-3 flex items-center gap-3 cursor-pointer rounded-md hover:bg-sidebar-accent/50 transition-colors text-sm font-medium"
                    >
                      {theme === "dark" ? (
                        <>
                          <Sun className="w-5 h-5 shrink-0" />
                          <span>Light Mode</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-5 h-5 shrink-0" />
                          <span>Dark Mode</span>
                        </>
                      )}
                    </button>

                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer px-3 py-3 my-1 rounded-md hover:bg-red-500/10 hover:text-red-600 transition-colors font-medium"
                  >
                    <Logout className="w-full flex items-center gap-3">
                      <LogOut className="w-5 h-5 shrink-0" />
                      <span>Sign Out</span>
                    </Logout>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>

  )
}
