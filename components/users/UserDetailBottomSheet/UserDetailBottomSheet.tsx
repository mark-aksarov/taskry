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

import { useTranslations } from "next-intl";
import { DetailModalLink } from "@/components/common/DetailModal";

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
        <DialogBody>{userDetailContainer}</DialogBody>
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
