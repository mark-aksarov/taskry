"use client";

import { Separator } from "@/ui/Separator";

interface UserNavigationLargeLayoutProps {
  userInformationLink: React.ReactNode;
  assignedTasksLink: React.ReactNode;
  userActions: React.ReactNode;
}

export function UserNavigationLargeLayout({
  userInformationLink,
  assignedTasksLink,
  userActions,
}: UserNavigationLargeLayoutProps) {
  return (
    <nav className="flex flex-col gap-2.5">
      {userInformationLink}
      {assignedTasksLink}

      {userActions && (
        <>
          <Separator />
          {userActions}
        </>
      )}
    </nav>
  );
}
