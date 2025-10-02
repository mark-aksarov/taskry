"use client";

import {
  CalendarCheck2,
  Contact,
  FolderClosed,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Sun,
  Users,
} from "lucide-react";
import { Badge } from "../ui/Badge";
import { twMerge } from "tailwind-merge";
import { Button } from "react-aria-components";
import { Divider } from "@/components/ui/Divider";
import { LangMenuBottomSheetTrigger } from "./LangMenuTrigger";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AppNavigationLink, navLinkStyle } from "./AppNavigationLink";

interface AppNavigationProps {
  className?: string;
  buttonClassName?: string;
}

export const AppNavigation = ({ className }: AppNavigationProps) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-2.5">
      <nav className={twMerge("flex flex-col gap-2.5", className)}>
        <AppNavigationLink href="/" isSelected={pathname === "/"}>
          <LayoutDashboard size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Dashboard
        </AppNavigationLink>

        <AppNavigationLink
          href="/projects"
          isSelected={pathname === "/projects"}
        >
          <FolderClosed size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Projects
        </AppNavigationLink>

        <AppNavigationLink href="/tasks" isSelected={pathname === "/tasks"}>
          <CalendarCheck2 size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Tasks
        </AppNavigationLink>

        <AppNavigationLink href="/team" isSelected={pathname === "/team"}>
          <Users size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Team
        </AppNavigationLink>

        <AppNavigationLink
          href="/customers"
          isSelected={pathname === "/customers"}
        >
          <Contact size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Customers
        </AppNavigationLink>

        <AppNavigationLink href="/inbox" isSelected={pathname === "/inbox"}>
          <Mail size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Inbox
          <Badge className="ml-auto rounded-xl px-1.5! py-0.5!">28</Badge>
        </AppNavigationLink>

        <AppNavigationLink
          href="/settings"
          isSelected={pathname === "/settings"}
        >
          <Settings size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Settings
        </AppNavigationLink>
      </nav>

      <Divider />

      <div className="flex flex-col gap-2.5 md:hidden">
        <LangMenuBottomSheetTrigger />

        <Button className={navLinkStyle}>
          <Sun size={18} strokeWidth={1.5} absoluteStrokeWidth />
          Light
        </Button>

        <Divider />
      </div>

      <Link href="#" className={navLinkStyle()}>
        <LogOut size={18} strokeWidth={1.5} absoluteStrokeWidth />
        Logout
      </Link>
    </div>
  );
};
