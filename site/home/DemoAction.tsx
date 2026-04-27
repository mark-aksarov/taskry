"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { PageSectionAction } from "../common/PageSection";

interface DemoActionProps {
  isGuest: boolean;
  hasSession: boolean;
}

export function DemoAction({ isGuest, hasSession }: DemoActionProps) {
  const t = useTranslations("site.home.DemoAction");
  const { onOpenChange } = useModal("switch-to-demo-modal");

  const demoProps =
    isGuest || !hasSession
      ? {
          as: "a" as const,
          href: isGuest ? "/dashboard" : "/guest-sign-in",
        }
      : {
          onPress: () => onOpenChange(true),
        };

  return (
    <PageSectionAction variant="outlined" label={t("label")} {...demoProps} />
  );
}
