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
import { useUpdateClientBio } from "../UpdateClientBioContext";

interface ClientBioDetailInfoAltProps {
  bio?: string;
}

export function ClientBioDetailInfoAlt({ bio }: ClientBioDetailInfoAltProps) {
  const t = useTranslations("dashboard.clients.ClientDetail");

  const { onOpenChange: onUpdateBioModalOpenChange } =
    useModal("updateClientBio");

  //Disable edit button while the client is being deleted
  const { isPending: isDeleteClientPending } = useDeleteClient();

  //Pending state while updating client bio
  const { isPending: isUpdateClientBioPending } = useUpdateClientBio();

  const handlePress = () => {
    onUpdateBioModalOpenChange(true);
  };

  return (
    <DetailInfoAlt
      data-test="client-bio-detail-info"
      title={<DetailTitle>{t("bio")}</DetailTitle>}
      content={<DetailText>{bio || t("noBio")}</DetailText>}
      rightSlot={
        <DetailEditButton
          aria-label={t("editBioButtonLabel")}
          data-test="edit-bio-button"
          isPending={isUpdateClientBioPending}
          isDisabled={isDeleteClientPending}
          onPress={handlePress}
        />
      }
      surface
    />
  );
}
