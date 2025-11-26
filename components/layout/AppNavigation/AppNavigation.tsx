"use client";

import {
  CalendarCheck2,
  Contact,
  FolderClosed,
  LayoutDashboard,
  LogOut,
  UserRound,
  Users,
} from "lucide-react";

import { Divider } from "@/components/ui";
import { usePathname } from "@/i18n/navigation";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { NavigationButton } from "@/components/common/NavigationButton";
import { LangMenuBottomSheetTrigger } from "../LangMenuTrigger";

interface AppNavigationProps {
  messages: {
    dashboard: string;
    projects: string;
    tasks: string;
    team: string;
    customers: string;
    profile: string;
    logout: string;
  };
}

export const AppNavigation = ({ messages }: AppNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton href="/" isActive={pathname === "/"}>
        <LayoutDashboard size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {messages.dashboard}
      </NavigationButton>

      <NavigationButton
        href="/projects"
        isActive={pathname.startsWith("/projects")}
      >
        <FolderClosed size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {messages.projects}
      </NavigationButton>

      <NavigationButton href="/tasks" isActive={pathname.startsWith("/tasks")}>
        <CalendarCheck2 size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {messages.tasks}
      </NavigationButton>

      <NavigationButton href="/team" isActive={pathname.startsWith("/team")}>
        <Users size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {messages.team}
      </NavigationButton>

      <NavigationButton
        href="/customers"
        isActive={pathname.startsWith("/customers")}
      >
        <Contact size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {messages.customers}
      </NavigationButton>

      <NavigationButton
        href="/profile"
        isActive={pathname.startsWith("/profile")}
      >
        <UserRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {messages.profile}
      </NavigationButton>

      <Divider />

      <div className="flex flex-col gap-2.5 md:hidden">
        <LangMenuBottomSheetTrigger />
        <ThemeToggleButton />
      </div>

      <NavigationButton href="#">
        <LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {messages.logout}
      </NavigationButton>
    </nav>
  );
};
