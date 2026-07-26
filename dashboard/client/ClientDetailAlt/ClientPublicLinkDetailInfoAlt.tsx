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
import { useUpdateClientPublicLink } from "../UpdateClientPublicLinkContext";

interface ClientPublicLinkDetailInfoAltProps {
  publicLink?: string;
}

export function ClientPublicLinkDetailInfoAlt({
  publicLink,
}: ClientPublicLinkDetailInfoAltProps) {
  const t = useTranslations("dashboard.clients.ClientDetail");

  const { onOpenChange: onUpdatePublicLinkModalOpenChange } = useModal(
    "updateClientPublicLink",
  );

  //Disable edit button while the client is being deleted
  const { isPending: isDeleteClientPending } = useDeleteClient();

  //Pending state while updating client public link
  const { isPending: isUpdateClientPublicLinkPending } =
    useUpdateClientPublicLink();

  const handlePress = () => {
    onUpdatePublicLinkModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="client-public-link-detail-info"
      className="border-none pb-0"
      title={<DetailTitle>{t("publicLink")}</DetailTitle>}
      content={<DetailText>{publicLink || t("noPublicLink")}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editPublicLinkButtonLabel")}
          data-test="edit-public-link-button"
          isPending={isUpdateClientPublicLinkPending}
          isDisabled={isDeleteClientPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
