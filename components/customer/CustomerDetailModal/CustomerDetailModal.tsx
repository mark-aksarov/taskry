import {
  DetailModal,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DetailModalLink } from "@/components/common/DetailModal";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface CustomerDetailModalProps {
  customerId: number;
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
}

export function CustomerDetailModal({
  customerId,
  customerDetailContainer,
  customerDetailHeaderContainer,
}: CustomerDetailModalProps) {
  const t = useTranslations("customers.CustomerDetailModal");

  const { isOpen, onOpenChange } = useModal("customerDetail");

  return (
    <DetailModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <DetailModalDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DialogBody className="flex flex-col gap-6">
          {customerDetailHeaderContainer}
          {customerDetailContainer}
        </DialogBody>
        <DialogFooter>
          <DetailModalLink
            label={t("openInFullPage")}
            href={`/customers/${customerId}`}
          />
        </DialogFooter>
      </DetailModalDialog>
    </DetailModal>
  );
}
