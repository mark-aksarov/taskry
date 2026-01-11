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

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { useGlobalContainer } from "@/components/layout/GlobalContainerContext";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

export function UserDetailModal({ userId }: { userId: string }) {
  const t = useTranslations("users.UserDetailModal");

  const { UserDetailContainer } = useGlobalContainer();

  if (!UserDetailContainer) {
    throw new Error("UserDetailContainer is missing in GlobalContainerContext");
  }

  return (
    <Modal isDismissable className="w-[600px]">
      <Dialog className="max-h-[calc(100dvh-64px)]">
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
            data-test="open-full-page-button"
            as="a"
            href={`/team/${userId}`}
            variant="primary"
            size="medium"
            label={t("openInFullPage")}
            className="w-full justify-center"
          />
        </DialogFooter>
      </Dialog>
    </Modal>
  );
}
