"use client";

import { DatabaseZap } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRole } from "@/common/RoleContext";
import { overlayTransitionDuration } from "@/ui/styles";
import { useModal } from "@/common/ModalManagerContext";
import { NavigationButton } from "@/dashboard/common/NavigationItem";

interface AppNavigationDemoDataModalTriggerProps {
  closeSheet?: () => void;
}

export function AppNavigationDemoDataModalTrigger({
  closeSheet,
}: AppNavigationDemoDataModalTriggerProps) {
  const t = useTranslations("dashboard.demoData.DemoDataModalTrigger");
  const { onOpenChange } = useModal("demoData");
  const role = useRole();

  function handlePress() {
    closeSheet?.();
    setTimeout(() => {
      onOpenChange(true);
    }, overlayTransitionDuration);
  }

  if (role !== "owner") {
    return null;
  }

  return (
    <NavigationButton
      variant="secondary"
      iconLeft={<DatabaseZap />}
      aria-label="label"
      onPress={handlePress}
      label={t("label")}
    />
  );
}
