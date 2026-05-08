"use client";

import {
  PageSectionActionLink,
  PageSectionActionButton,
} from "../common/PageSection";

import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";

interface DemoActionProps {
  isGuest: boolean;
  hasSession: boolean;
}

export function DemoAction({ isGuest, hasSession }: DemoActionProps) {
  const t = useTranslations("site.home.DemoAction");
  const { onOpenChange } = useModal("switch-to-demo-modal");

  if (isGuest || !hasSession) {
    return (
      <PageSectionActionLink
        href={isGuest ? "/dashboard" : "/guest-sign-in"}
        variant="secondary"
        outlined
        label={t("label")}
      />
    );
  }

  return (
    <PageSectionActionButton
      onPress={() => onOpenChange(true)}
      variant="secondary"
      outlined
      label={t("label")}
    />
  );
}
