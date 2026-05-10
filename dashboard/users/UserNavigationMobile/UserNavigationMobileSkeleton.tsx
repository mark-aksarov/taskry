"use client";

import { ButtonSkeleton } from "@/ui/Skeleton";
import { UserNavigationMobileLayout } from "./UserNavigationMobileLayout";

export function UserNavigationMobileSkeleton() {
  return (
    <UserNavigationMobileLayout
      userInformationLink={<ButtonSkeleton className="w-[5rem]" />}
      assignedTasksLink={<ButtonSkeleton className="w-[5rem]" />}
    />
  );
}
