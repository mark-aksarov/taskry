import {
  DetailModal,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DetailBottomSheetLink } from "@/components/common/DetailBottomSheet";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

interface CustomerDetailModalProps {
  customerId: number;
  customerDetailContainer: React.ReactNode;
}

export function CustomerDetailModal({
  customerId,
  customerDetailContainer,
}: CustomerDetailModalProps) {
  const t = useTranslations("customers.CustomerDetailModal");

  return (
    <DetailModal>
      <DetailModalDialog>
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
        <DialogBody>{customerDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailBottomSheetLink
            label={t("openInFullPage")}
            href={`/customers?customerId=${customerId}`}
          />
        </DialogFooter>
      </DetailModalDialog>
    </DetailModal>
  );
}
