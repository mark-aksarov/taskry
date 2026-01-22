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
import { OverlayTriggerStateContext } from "react-aria-components";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

export interface UserDetailBottomSheetProps {
  userId: string;
  userDetailContainer: React.ReactNode;
}

export function UserDetailBottomSheet({
  userId,
  userDetailContainer,
}: UserDetailBottomSheetProps) {
  const state = useContext(OverlayTriggerStateContext);

  if (!state) {
    throw new Error(
      "UserDetailBottomSheet must be used within a OverlayTriggerProvider",
    );
  }

  const t = useTranslations("users.UserDetailBottomSheet");

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
            {userDetailContainer}
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
