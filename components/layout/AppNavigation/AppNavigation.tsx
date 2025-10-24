"use client";

import {
  CalendarCheck2,
  Contact,
  FolderClosed,
  LayoutDashboard,
  LogOut,
  Mail,
  UserRound,
  Users,
} from "lucide-react";

import { Badge, Divider } from "@/components/ui";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { NavigationButton } from "@/components/common/NavigationButton";
import { LangMenuBottomSheetTrigger } from "../LangMenuTrigger";
import { usePathname } from "next/navigation";

export const AppNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton href="/" isActive={pathname === "/"}>
        <LayoutDashboard size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Dashboard
      </NavigationButton>

      <NavigationButton
        href="/projects"
        isActive={pathname.startsWith("/projects")}
      >
        <FolderClosed size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Projects
      </NavigationButton>

      <NavigationButton href="/tasks" isActive={pathname.startsWith("/tasks")}>
        <CalendarCheck2 size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Tasks
      </NavigationButton>

      <NavigationButton href="/team" isActive={pathname.startsWith("/team")}>
        <Users size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Team
      </NavigationButton>

      <NavigationButton
        href="/customers"
        isActive={pathname.startsWith("/customers")}
      >
        <Contact size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Customers
      </NavigationButton>

      <NavigationButton href="/inbox" isActive={pathname.startsWith("/inbox")}>
        <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Inbox
        <Badge className="ml-auto rounded-xl px-1.5! py-0.5!">28</Badge>
      </NavigationButton>

      <NavigationButton
        href="/profile"
        isActive={pathname.startsWith("/profile")}
      >
        <UserRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Profile
      </NavigationButton>

      <Divider />

      <div className="flex flex-col gap-2.5 md:hidden">
        <LangMenuBottomSheetTrigger />
        <ThemeToggleButton />
      </div>

      <NavigationButton href="#">
        <LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Logout
      </NavigationButton>
    </nav>
  );
};
