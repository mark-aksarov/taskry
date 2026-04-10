import {
  DetailModal,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DialogBody } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface UserDetailModalProps {
  userDetailHeaderContainer: React.ReactNode;
  userDetailContainer: React.ReactNode;
}

export function UserDetailModal({
  userDetailHeaderContainer,
  userDetailContainer,
}: UserDetailModalProps) {
  const t = useTranslations("users.UserDetailModal");

  const { isOpen, onOpenChange } = useModal("userDetail");

  return (
    <DetailModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DetailModalDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DialogBody className="flex flex-col gap-6">
          {userDetailHeaderContainer}
          {userDetailContainer}
        </DialogBody>
      </DetailModalDialog>
    </DetailModal>
  );
}
