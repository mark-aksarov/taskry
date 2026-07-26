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
import { useUpdateClientPhoneNumber } from "../UpdateClientPhoneNumberContext";

interface ClientPhoneNumberDetailInfoAltProps {
  phoneNumber?: string;
}

export function ClientPhoneNumberDetailInfoAlt({
  phoneNumber,
}: ClientPhoneNumberDetailInfoAltProps) {
  const t = useTranslations("dashboard.clients.ClientDetail");

  const { onOpenChange: onUpdatePhoneNumberModalOpenChange } = useModal(
    "updateClientPhoneNumber",
  );

  //Disable edit button while the client is being deleted
  const { isPending: isDeleteClientPending } = useDeleteClient();

  //Pending state while updating client phone number
  const { isPending: isUpdateClientPhoneNumberPending } =
    useUpdateClientPhoneNumber();

  const handlePress = () => {
    onUpdatePhoneNumberModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="client-phone-number-detail-info"
      title={<DetailTitle>{t("phoneNumber")}</DetailTitle>}
      content={<DetailText>{phoneNumber || t("noPhoneNumber")}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editPhoneNumberButtonLabel")}
          data-test="edit-phone-number-button"
          isPending={isUpdateClientPhoneNumberPending}
          isDisabled={isDeleteClientPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
