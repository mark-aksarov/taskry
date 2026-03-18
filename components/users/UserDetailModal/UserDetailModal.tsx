import {
  DetailModal,
  DetailModalDialog,
  DetailModalLink,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UserDetailModalProps {
  userId: string;
  userDetailHeaderContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
}

export function UserDetailModal({
  userId,
  userDetailHeaderContainer,
  userDetailContainer,
}: UserDetailModalProps) {
  const t = useTranslations("users.UserDetailModal");

  return (
    <DetailModal>
      <DetailModalDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DialogBody className="flex flex-col gap-6">
          {userDetailHeaderContainer}
          {userDetailContainer}
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
