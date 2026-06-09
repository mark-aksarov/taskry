"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useCurrentUser } from "@/common/CurrentUserContext";
import { PageSectionActionLink, PageSectionActionButton } from "./PageSection";

export function DemoAction() {
  const t = useTranslations("site.home.DemoAction");
  const { onOpenChange } = useModal("switch-to-demo-modal");
  const { isGuest, userId } = useCurrentUser();

  // If the user is a guest, redirect to dashboard
  // If the user is not signed in, redirect to guest sign-in page
  if (isGuest || !userId) {
    return (
      <PageSectionActionLink
        href={isGuest ? "/dashboard" : "/guest-sign-in"}
        className="bg-transparent"
        variant="secondary"
        outlined
        label={t("label")}
      />
    );
  }

  // If the user is signed in and not a guest, open the switch to demo modal
  return (
    <PageSectionActionButton
      onPress={() => onOpenChange(true)}
      className="bg-transparent"
      variant="secondary"
      outlined
      label={t("label")}
    />
  );
}
