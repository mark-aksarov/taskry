"use client";

import {
  Users,
  Contact,
  UserRound,
  FolderClosed,
  CalendarCheck2,
  LayoutDashboard,
} from "lucide-react";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Separator } from "@/components/ui/Separator";
import { NavigationButton } from "@/components/common/NavigationButton";
import { AppNavigationLogoutButton } from "./AppNavigationLogoutButton";
import { AppNavigationLangMenuTrigger } from "./AppNavigationLangMenuTrigger";
import { AppNavigationThemeToggleButton } from "./AppNavigationThemeToggleButton";

export const AppNavigation = () => {
  const pathname = usePathname();
  const t = useTranslations("layout.AppNavigation");

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton href="/" isActive={pathname === "/"}>
        <LayoutDashboard size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("dashboard")}
      </NavigationButton>

      <NavigationButton
        href="/projects"
        isActive={
          pathname.startsWith("/projects") || pathname === "/project-categories"
        }
      >
        <FolderClosed size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("projects")}
      </NavigationButton>

      <NavigationButton
        href="/tasks"
        isActive={
          pathname.startsWith("/tasks") || pathname === "/task-categories"
        }
      >
        <CalendarCheck2 size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("tasks")}
      </NavigationButton>

      <NavigationButton
        href="/team"
        isActive={pathname.startsWith("/team") || pathname === "/positions"}
      >
        <Users size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("team")}
      </NavigationButton>

      <NavigationButton
        href="/customers"
        isActive={
          pathname.startsWith("/customers") || pathname === "/companies"
        }
      >
        <Contact size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("customers")}
      </NavigationButton>

      <NavigationButton
        href="/profile"
        isActive={pathname.startsWith("/profile")}
      >
        <UserRound size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("profile")}
      </NavigationButton>

      <Separator />

      <div className="flex flex-col gap-2.5 md:hidden">
        <AppNavigationLangMenuTrigger />
        <AppNavigationThemeToggleButton />
      </div>

      <AppNavigationLogoutButton />
    </nav>
  );
};
