import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetLink,
} from "@/dashboard/common/DetailSideSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/dashboard/common/ModalManagerContext";
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
        <DialogBody className="flex flex-col gap-6">
          {userDetailHeaderContainer}
          {userDetailContainer}
        </DialogBody>
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
