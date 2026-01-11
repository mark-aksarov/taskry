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

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { OverlayTriggerState } from "react-stately";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

export interface UserDetailBottomSheetProps {
  userId: string;
  state: OverlayTriggerState;
}

export function UserDetailBottomSheet({
  userId,
  state,
}: UserDetailBottomSheetProps) {
  const t = useTranslations("users.UserDetailBottomSheet");

  const { UserDetailContainer } = useGlobalContainer();

  if (!UserDetailContainer) {
    throw new Error("UserDetailContainer is missing in GlobalContainerContext");
  }

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
              <PersonDetailPresentation
                personHeader={<PersonHeaderSkeleton />}
                userDetail={<UserDetailSkeleton />}
              />
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
