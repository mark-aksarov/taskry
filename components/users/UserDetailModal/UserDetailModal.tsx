import {
  DetailModal,
  DetailModalDialog,
  DetailModalLink,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
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
