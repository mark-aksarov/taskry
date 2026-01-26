import {
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogHeading,
  DialogCloseButton,
} from "@/components/ui/Dialog";

import {
  DetailBottomSheet,
  DetailBottomSheetDialog,
} from "@/components/common/DetailBottomSheet";

import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { DetailModalLink } from "@/components/common/DetailModal";
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
  const t = useTranslations("users.UserDetailBottomSheet");

  return (
    <DetailBottomSheet>
      <DetailBottomSheetDialog>
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
          <DetailModalLink
            label={t("openInFullPage")}
            href={`/team/${userId}`}
          />
        </DialogFooter>
      </DetailBottomSheetDialog>
    </DetailBottomSheet>
  );
}
