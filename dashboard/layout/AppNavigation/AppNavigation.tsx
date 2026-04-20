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
import { Separator } from "@/ui/Separator";
import { NavigationButton } from "@/dashboard/common/NavigationButton";
import { AppNavigationLogoutButton } from "./AppNavigationLogoutButton";
import { AppNavigationLangMenuTrigger } from "./AppNavigationLangMenuTrigger";
import { AppNavigationThemeToggleButton } from "./AppNavigationThemeToggleButton";

export const AppNavigation = () => {
  const pathname = usePathname();
  const t = useTranslations("dashboard.layout.AppNavigation");

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton
        href="/"
        isActive={pathname === "/"}
        iconLeft={
          <LayoutDashboard size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        label={t("dashboard")}
      />

      <NavigationButton
        href="/projects"
        isActive={
          pathname.startsWith("/projects") || pathname === "/project-categories"
        }
        iconLeft={
          <FolderClosed size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        label={t("projects")}
      />

      <NavigationButton
        href="/tasks"
        isActive={
          pathname.startsWith("/tasks") || pathname === "/task-categories"
        }
        iconLeft={
          <CalendarCheck2 size={18} strokeWidth={1.5} absoluteStrokeWidth />
        }
        label={t("tasks")}
      />

      <NavigationButton
        href="/team"
        isActive={pathname.startsWith("/team") || pathname === "/positions"}
        iconLeft={<Users size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("team")}
      />

      <NavigationButton
        href="/customers"
        isActive={
          pathname.startsWith("/customers") || pathname === "/companies"
        }
        iconLeft={<Contact size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("customers")}
      />

      <NavigationButton
        href="/profile"
        isActive={pathname.startsWith("/profile")}
        iconLeft={<UserRound size={18} strokeWidth={1.5} absoluteStrokeWidth />}
        label={t("profile")}
      />

      <Separator />

      <div className="flex flex-col gap-2.5 md:hidden">
        <AppNavigationLangMenuTrigger />
        <AppNavigationThemeToggleButton />
      </div>

      <AppNavigationLogoutButton />
    </nav>
  );
};
