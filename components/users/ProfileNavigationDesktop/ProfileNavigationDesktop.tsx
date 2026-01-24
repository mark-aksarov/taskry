"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Divider } from "@/components/ui/Divider";
import { CalendarCheck, Info } from "lucide-react";
import { ProfileActions } from "../ProfileActions";
import { NavigationButton } from "@/components/common/NavigationButton";

export function ProfileNavigationDesktop() {
  const t = useTranslations("users.ProfileNavigationDesktop");
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2.5">
      <NavigationButton
        href="/profile"
        isActive={pathname === "/profile"}
        variant="secondary"
      >
        <Info size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("userInformation")}
      </NavigationButton>

      <NavigationButton
        href="/profile/tasks"
        isActive={pathname === "/profile/tasks"}
        variant="secondary"
      >
        <CalendarCheck size={18} strokeWidth={1.5} absoluteStrokeWidth />
        {t("assignedTasks")}
      </NavigationButton>

      <Divider />

      <ProfileActions />
    </nav>
  );
}
