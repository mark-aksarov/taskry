"use client";

import {
  DetailText,
  DetailTitle,
  DetailInfoAlt,
  DetailEditButton,
} from "@/dashboard/common/Detail";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDeleteClient } from "../DeleteClientContext";
import { useUpdateClientCompany } from "../UpdateClientCompanyContext";

interface ClientCompanyDetailInfoAltProps {
  company?: {
    name: string;
  };
}

export function ClientCompanyDetailInfoAlt({
  company,
}: ClientCompanyDetailInfoAltProps) {
  const t = useTranslations("dashboard.clients.ClientDetail");

  const { onOpenChange: onUpdatePositionModalOpenChange } = useModal(
    "updateClientCompany",
  );

  //Disable edit button while the client is being deleted
  const { isPending: isDeleteClientPending } = useDeleteClient();

  //Pending state while updating client company
  const { isPending: isUpdateClientCompanyPending } = useUpdateClientCompany();

  const handlePress = () => {
    onUpdatePositionModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="client-company-detail-info"
      title={<DetailTitle>{t("company")}</DetailTitle>}
      content={<DetailText>{company?.name || t("noCompany")}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editCompanyButtonLabel")}
          data-test="edit-company-button"
          isPending={isUpdateClientCompanyPending}
          isDisabled={isDeleteClientPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
