"use client";

import {
  DetailSideSheet,
  DetailSideSheetDialog,
  DetailSideSheetDialogBody,
  DetailSideSheetLink,
} from "@/dashboard/common/DetailSideSheet";

import { useTranslations } from "next-intl";
import { DialogFooter } from "@/ui/Dialog";
import { useModal } from "@/common/ModalManagerContext";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

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
  const t = useTranslations("dashboard.customers.CustomerDetailSideSheet");

  const { isOpen, onOpenChange } = useModal("customerDetail");

  return (
    <DetailSideSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <DetailSideSheetDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DetailSideSheetDialogBody className="flex flex-col gap-6">
          {customerDetailHeaderContainer}
          {customerDetailContainer}
        </DetailSideSheetDialogBody>
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
