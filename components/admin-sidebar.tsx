"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, CheckSquare, FileText, Home, Settings, ShoppingBag, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: BarChart,
    },
    {
      title: "Approvals",
      href: "/admin/approvals",
      icon: CheckSquare,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: FileText,
    },
    {
      title: "Shop",
      href: "/admin/shop",
      icon: ShoppingBag,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
          Admin Panel
        </Link>
        <SidebarTrigger />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link href="/">
                <Home />
                <span>Back to Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <Link href={item.href}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <p className="text-xs text-center text-muted-foreground">Wedding Stories Admin v1.0</p>
      </SidebarFooter>
    </Sidebar>
  )
}

