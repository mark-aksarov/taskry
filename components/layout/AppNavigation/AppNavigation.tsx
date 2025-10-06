import {
  CalendarCheck2,
  Contact,
  FolderClosed,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Users,
} from "lucide-react";

import { twMerge } from "tailwind-merge";
import { Badge, Divider } from "@/components/ui";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { AppNavigationItem } from "./AppNavigationItem";
import { LangMenuBottomSheetTrigger } from "../LangMenuTrigger";

interface AppNavigationProps {
  className?: string;
}

export const AppNavigation = ({ className }: AppNavigationProps) => {
  return (
    <div className="flex flex-col gap-2.5">
      <nav className={twMerge("flex flex-col gap-2.5", className)}>
        <AppNavigationItem href="/">
          <LayoutDashboard size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Dashboard
        </AppNavigationItem>

        <AppNavigationItem href="/projects">
          <FolderClosed size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Projects
        </AppNavigationItem>

        <AppNavigationItem href="/tasks">
          <CalendarCheck2 size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Tasks
        </AppNavigationItem>

        <AppNavigationItem href="/team">
          <Users size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Team
        </AppNavigationItem>

        <AppNavigationItem href="/customers">
          <Contact size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Customers
        </AppNavigationItem>

        <AppNavigationItem href="/inbox">
          <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Inbox
          <Badge className="ml-auto rounded-xl px-1.5! py-0.5!">28</Badge>
        </AppNavigationItem>

        <AppNavigationItem href="/settings">
          <Settings size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Settings
        </AppNavigationItem>
      </nav>

      <Divider />

      <div className="flex flex-col gap-2.5 md:hidden">
        <LangMenuBottomSheetTrigger />
        <ThemeToggleButton />
        <Divider />
      </div>

      <AppNavigationItem href="#">
        <LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Logout
      </AppNavigationItem>
    </div>
  );
};
