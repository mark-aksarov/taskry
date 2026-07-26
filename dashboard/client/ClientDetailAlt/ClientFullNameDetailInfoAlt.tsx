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
import { useUpdateClientFullName } from "../UpdateClientFullNameContext";

interface ClientFullNameDetailInfoAltProps {
  fullName: string;
}

export function ClientFullNameDetailInfoAlt({
  fullName,
}: ClientFullNameDetailInfoAltProps) {
  const t = useTranslations("dashboard.clients.ClientDetail");

  const { onOpenChange: onUpdateFullNameModalOpenChange } = useModal(
    "updateClientFullName",
  );

  //Disable edit button while the client is being deleted
  const { isPending: isDeleteClientPending } = useDeleteClient();

  //Pending state while updating client full name
  const { isPending: isUpdateClientFullNamePending } =
    useUpdateClientFullName();

  const handlePress = () => {
    onUpdateFullNameModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="client-full-name-detail-info"
      title={<DetailTitle>{t("fullName")}</DetailTitle>}
      content={<DetailText>{fullName}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editFullNameButtonLabel")}
          data-test="edit-full-name-button"
          isPending={isUpdateClientFullNamePending}
          isDisabled={isDeleteClientPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
