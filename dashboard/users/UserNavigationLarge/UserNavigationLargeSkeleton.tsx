"use client";

import { ButtonSkeleton } from "@/ui/Skeleton";
import { ProfileActionsSkeleton } from "../ProfileActions";
import { UserNavigationLargeLayout } from "./UserNavigationLargeLayout";

export function UserNavigationLargeSkeleton() {
  return (
    <UserNavigationLargeLayout
      userInformationLink={
        <ButtonSkeleton size="medium" ghost className="w-[8rem]" />
      }
      assignedTasksLink={
        <ButtonSkeleton size="medium" ghost className="w-[12rem]" />
      }
      userActions={<ProfileActionsSkeleton />}
    />
  );
}
