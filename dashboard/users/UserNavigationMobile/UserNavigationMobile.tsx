"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { UserNavigationMobileLink } from "./UserNavigationMobileLink";

export function UserNavigationMobile() {
  const t = useTranslations("dashboard.users.UserNavigationMobile");

  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  return (
    <nav className="flex gap-2 md:hidden">
      <UserNavigationMobileLink
        href={`/team/${id}`}
        isSelected={pathname === `/team/${id}`}
      >
        {t("info")}
      </UserNavigationMobileLink>

      <UserNavigationMobileLink
        href={`/team/${id}/tasks`}
        isSelected={pathname === `/team/${id}/tasks`}
      >
        {t("assignedTasks")}
      </UserNavigationMobileLink>
    </nav>
  );
}
