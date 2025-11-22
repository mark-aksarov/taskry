"use client";

import { Suspense, useContext } from "react";
import { DetailModal } from "@/components/common/DetailModal";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserDetailClientContainerContext } from "../UserDetailClientContainer";
import { UserHeaderSkeleton } from "@/components/users/UserHeader";

export function UserDetailModal({ userId }: { userId: string }) {
  const UserDetailClientContainer = useContext(
    UserDetailClientContainerContext,
  );

  return (
    <DetailModal title="User Details">
      <Suspense
        fallback={
          <div className="flex flex-col gap-6">
            <UserHeaderSkeleton />
            <UserDetailSkeleton />
          </div>
        }
      >
        <UserDetailClientContainer userId={userId} />
      </Suspense>
    </DetailModal>
  );
}
