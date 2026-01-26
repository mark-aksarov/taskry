import {
  DetailModal,
  DetailModalDialog,
  DetailModalLink,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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
        <DialogBody>{userDetailContainer}</DialogBody>
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
