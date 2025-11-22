"use client";

import { Suspense, useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { UserDetailClientContainerContext } from "../UserDetailClientContainer";

export function UserDetailModal({ userId }: { userId: string }) {
  const UserDetailClientContainer = useContext(
    UserDetailClientContainerContext,
  );

  return (
    <DetailModal title="User Details">
      <Suspense
        fallback={
          <div className="flex flex-col gap-6">
            <PersonHeaderSkeleton />
            <UserDetailSkeleton />
          </div>
        }
      >
        <UserDetailClientContainer userId={userId} />
      </Suspense>
    </DetailModal>
  );
}
