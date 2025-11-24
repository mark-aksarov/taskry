"use client";

import {
  Button,
  Dialog,
  DialogBody,
  BottomSheet,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";
import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
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
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>User Details</DialogHeading>
          <DialogCloseButton />
        </DialogHeader>
        <DialogBody>
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
        </DialogBody>
        <DialogFooter>
          <Button
            as="a"
            href={`/team/${userId}`}
            variant="primary"
            size="medium"
            label="Open in Full Page"
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
