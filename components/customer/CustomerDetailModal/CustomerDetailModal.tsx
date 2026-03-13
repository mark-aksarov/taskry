import {
  DetailModal,
  DetailModalDialog,
} from "@/components/common/DetailModal";

import { useTranslations } from "next-intl";
import { DetailModalLink } from "@/components/common/DetailModal";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui/Dialog";

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

  return (
    <DetailModal>
      <DetailModalDialog>
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
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
