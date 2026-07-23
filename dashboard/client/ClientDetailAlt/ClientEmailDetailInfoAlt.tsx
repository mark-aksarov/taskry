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
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { useUpdateClientEmail } from "../UpdateClientEmailContext";

interface ClientEmailDetailInfoAltProps {
  email: string;
}

export function ClientEmailDetailInfoAlt({
  email,
}: ClientEmailDetailInfoAltProps) {
  const t = useTranslations("dashboard.clients.ClientDetail");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onUpdateEmailModalOpenChange } = useModal(
    "updateClientEmail",
  );

  //Disable edit button while the client is being deleted
  const { isPending: isDeleteClientPending } = useDeleteClient();

  //Pending state while updating client email
  const { isPending: isUpdateClientEmailPending } = useUpdateClientEmail();

  const handlePress = () => {
    guestGuard(() => onUpdateEmailModalOpenChange(true));
  };

  return (
    <DetailInfoAlt
      data-test="client-email-detail-info"
      title={<DetailTitle>{t("email")}</DetailTitle>}
      content={<DetailText>{email}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editEmailButtonLabel")}
          data-test="edit-email-button"
          isPending={isUpdateClientEmailPending}
          isDisabled={isDeleteClientPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
