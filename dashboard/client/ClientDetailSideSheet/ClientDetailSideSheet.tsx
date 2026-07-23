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

interface ClientDetailSideSheetProps {
  clientId: number;
  clientDetailContainer: React.ReactNode;
  clientDetailHeaderContainer: React.ReactNode;
}

export function ClientDetailSideSheet({
  clientId,
  clientDetailContainer,
  clientDetailHeaderContainer,
}: ClientDetailSideSheetProps) {
  const t = useTranslations("dashboard.clients.ClientDetailSideSheet");

  const { isOpen, onOpenChange } = useModal("clientDetail");

  return (
    <DetailSideSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <DetailSideSheetDialog>
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
        <DetailSideSheetDialogBody className="flex flex-col gap-6">
          {clientDetailHeaderContainer}
          {clientDetailContainer}
        </DetailSideSheetDialogBody>
        <DialogFooter>
          <DetailSideSheetLink
            href={`/clients/${clientId}`}
            label={t("openInFullPage")}
          />
        </DialogFooter>
      </DetailSideSheetDialog>
    </DetailSideSheet>
  );
}
