"use client";

import {
  Modal,
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui";

import { Suspense, useContext } from "react";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { UserDetailClientContainerContext } from "../UserDetailClientContainer";

export function UserDetailModal({ userId }: { userId: string }) {
  const UserDetailClientContainer = useContext(
    UserDetailClientContainerContext,
  );

  return (
    <Modal isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
        <DialogHeader>
          <DialogHeading>Task Details</DialogHeading>
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
    </Modal>
  );
}
