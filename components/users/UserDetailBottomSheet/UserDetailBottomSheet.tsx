"use client";

import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { DetailBottomSheet } from "@/components/common/DetailBottomSheet";
import { UserDetailClientContainerContext } from "../UserDetailClientContainer";

export interface UserDetailBottomSheetProps {
  userId: string;
  state: OverlayTriggerState;
}

export function UserDetailBottomSheet({
  userId,
  state,
}: UserDetailBottomSheetProps) {
  const UserDetailClientContainer = useContext(
    UserDetailClientContainerContext,
  );

  return (
    <DetailBottomSheet state={state} title="User Details">
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
    </DetailBottomSheet>
  );
}
