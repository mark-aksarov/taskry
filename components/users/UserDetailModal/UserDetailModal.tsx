"use client";

import {
  DetailModal,
  DetailModalDialog,
  DetailModalLink,
} from "@/components/common/DetailModal";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { UserDetailSkeleton } from "@/components/users/UserDetail";
import { PersonHeaderSkeleton } from "@/components/common/PersonHeader";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";
import { PersonDetailPresentation } from "@/components/common/PersonDetailPresentation";

interface UserDetailModalProps {
  userId: string;
  userDetailContainer: React.ReactNode;
}

export function UserDetailModal({
  userId,
  userDetailContainer,
}: UserDetailModalProps) {
  const t = useTranslations("users.UserDetailModal");

  return (
    <DetailModal>
      <DetailModalDialog>
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
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
          <DetailModalLink
            label={t("openInFullPage")}
            href={`/team/${userId}`}
          />
        </DialogFooter>
      </DetailModalDialog>
    </DetailModal>
  );
}
