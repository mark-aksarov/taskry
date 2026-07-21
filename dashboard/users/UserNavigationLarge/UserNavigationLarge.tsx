"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { CalendarCheck, Info } from "lucide-react";
import { useDeleteUser } from "../DeleteUserContext";
import { NavigationLink } from "@/dashboard/common/NavigationItem";
import { UserNavigationLargeLayout } from "./UserNavigationLargeLayout";

interface UserNavigationLargeProps {
  userActions: React.ReactNode;
}

export function UserNavigationLarge({ userActions }: UserNavigationLargeProps) {
  const t = useTranslations("dashboard.users.UserNavigationLarge");

  const pathname = usePathname();
  const { id } = useParams<{ id: string }>();

  const { isPending: isDeleteUserPending } = useDeleteUser();

  return (
    <UserNavigationLargeLayout
      userInformationLink={
        <NavigationLink
          href={`/team/${id}`}
          isActive={pathname === `/team/${id}`}
          variant="secondary"
          isDisabled={isDeleteUserPending}
          iconLeft={<Info size={18}   />}
          label={t("userInformation")}
        />
      }
      assignedTasksLink={
        <NavigationLink
          href={`/team/${id}/tasks`}
          isActive={pathname === `/team/${id}/tasks`}
          variant="secondary"
          isDisabled={isDeleteUserPending}
          iconLeft={
            <CalendarCheck size={18}   />
          }
          label={t("assignedTasks")}
        />
      }
      userActions={userActions}
    />
  );
}
