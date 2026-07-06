import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetDialogBody,
  DetailSideSheetLink,
} from "@/dashboard/common/DetailSideSheet";

import { DialogFooter } from "@/ui/Dialog";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface UserDetailSideSheetProps {
  userId: string;
  userDetailHeaderContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
}

export function UserDetailSideSheet({
  userId,
  userDetailHeaderContainer,
  userDetailContainer,
}: UserDetailSideSheetProps) {
  const t = useTranslations("dashboard.users.UserDetailSideSheet");

  const { isOpen, onOpenChange } = useModal("userDetail");

  return (
    <DetailSideSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <DetailSideSheetDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DetailSideSheetDialogBody className="flex flex-col gap-6">
          {userDetailHeaderContainer}
          {userDetailContainer}
        </DetailSideSheetDialogBody>
        <DialogFooter>
          <DetailSideSheetLink
            href={`/team/${userId}`}
            label={t("openInFullPage")}
          />
        </DialogFooter>
      </DetailSideSheetDialog>
    </DetailSideSheet>
  );
}
