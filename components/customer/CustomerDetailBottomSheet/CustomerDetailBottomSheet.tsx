"use client";

import {
  DetailBottomSheet,
  DetailBottomSheetLink,
  DetailBottomSheetDialog,
} from "@/components/common/DetailBottomSheet";

import { useTranslations } from "next-intl";
import { DialogBody, DialogFooter, DialogHeader } from "@/components/ui";

export interface CustomerDetailBottomSheetProps {
  customerId: number;
  customerDetailContainer: React.ReactNode;
}

export function CustomerDetailBottomSheet({
  customerId,
  customerDetailContainer,
}: CustomerDetailBottomSheetProps) {
  const t = useTranslations("customers.CustomerDetailBottomSheet");

  return (
    <DetailBottomSheet>
      <DetailBottomSheetDialog>
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
        <DialogBody>{customerDetailContainer}</DialogBody>
        <DialogFooter>
          <DetailBottomSheetLink
            label={t("openInFullPage")}
            href={`/customers?customerId=${customerId}`}
          />
        </DialogFooter>
      </DetailBottomSheetDialog>
    </DetailBottomSheet>
  );
}
