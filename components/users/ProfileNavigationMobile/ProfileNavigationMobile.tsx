"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { UserNavigationMobileLink } from "../UserNavigationMobile";

export function ProfileNavigationMobile() {
  const t = useTranslations("users.ProfileNavigationDesktop");
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 md:hidden">
      <UserNavigationMobileLink
        href="/profile"
        isSelected={pathname === "/profile"}
      >
        {t("info")}
      </UserNavigationMobileLink>

      <UserNavigationMobileLink
        href="/profile/tasks"
        isSelected={pathname === "/profile/tasks"}
      >
        {t("assignedTasks")}
      </UserNavigationMobileLink>
    </nav>
  );
}
