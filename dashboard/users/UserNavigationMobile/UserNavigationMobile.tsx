"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useDeleteUser } from "../DeleteUserContext";
import { UserNavigationMobileLink } from "./UserNavigationMobileLink";
import { UserNavigationMobileLayout } from "./UserNavigationMobileLayout";

export function UserNavigationMobile() {
  const t = useTranslations("dashboard.users.UserNavigationMobile");

  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  const { isPending: isDeleteUserPending } = useDeleteUser();

  return (
    <UserNavigationMobileLayout
      userInformationLink={
        <UserNavigationMobileLink
          href={`/team/${id}`}
          isSelected={pathname === `/team/${id}`}
          isDisabled={isDeleteUserPending}
        >
          {t("info")}
        </UserNavigationMobileLink>
      }
      assignedTasksLink={
        <UserNavigationMobileLink
          href={`/team/${id}/tasks`}
          isSelected={pathname === `/team/${id}/tasks`}
          isDisabled={isDeleteUserPending}
        >
          {t("assignedTasks")}
        </UserNavigationMobileLink>
      }
    />
  );
}
