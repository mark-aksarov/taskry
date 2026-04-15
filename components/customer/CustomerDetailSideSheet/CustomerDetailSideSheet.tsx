import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetLink,
} from "@/components/common/DetailSideSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter } from "@/components/ui/Dialog";
import { useModal } from "@/components/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/components/common/DialogHeaderWithClose";

interface CustomerDetailSideSheetProps {
  customerId: number;
  customerDetailContainer: React.ReactNode;
  customerDetailHeaderContainer: React.ReactNode;
}

export function CustomerDetailSideSheet({
  customerId,
  customerDetailContainer,
  customerDetailHeaderContainer,
}: CustomerDetailSideSheetProps) {
  const t = useTranslations("customers.CustomerDetailSideSheet");

  const { isOpen, onOpenChange } = useModal("customerDetail");

  return (
    <DetailSideSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <DetailSideSheetDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DialogBody className="flex flex-col gap-6">
          {customerDetailHeaderContainer}
          {customerDetailContainer}
        </DialogBody>
        <DialogFooter>
          <DetailSideSheetLink
            href={`/customers/${customerId}`}
            label={t("openInFullPage")}
          />
        </DialogFooter>
      </DetailSideSheetDialog>
    </DetailSideSheet>
  );
}
