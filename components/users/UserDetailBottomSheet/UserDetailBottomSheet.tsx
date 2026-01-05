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
import { useTranslations } from "next-intl";
import { Suspense, useContext } from "react";
import { OverlayTriggerState } from "react-stately";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { UserDetailContainerContext } from "../UserDetailContainer";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";

export interface UserDetailBottomSheetProps {
  userId: string;
  state: OverlayTriggerState;
}

export function UserDetailBottomSheet({
  userId,
  state,
}: UserDetailBottomSheetProps) {
  const t = useTranslations("users.UserDetailBottomSheet");

  const UserDetailContainer = useContext(UserDetailContainerContext);

  return (
    <BottomSheet isDismissable state={state} className="md:hidden">
      <Dialog className="max-h-[calc(100dvh-6.25rem)]">
        <DialogHeader>
          <DialogHeading>{t("dialogHeading")}</DialogHeading>
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
            <UserDetailContainer userId={userId} />
          </Suspense>
        </DialogBody>
        <DialogFooter>
          <Button
            as="a"
            href={`/team/${userId}`}
            variant="primary"
            size="medium"
            label={t("openInFullPage")}
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </BottomSheet>
  );
}
