"use client";

import { useTranslations } from "next-intl";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useUserPositionFiltersModal } from "./UserPositionFiltersModalContext";

export function UserPositionFiltersModalTrigger() {
  const t = useTranslations("users.UserPositionFiltersModal");
  const { onOpenChange } = useUserPositionFiltersModal();

  return (
    <FilterButtonMobile
      mode="single"
      label={t("label")}
      onPress={() => onOpenChange(true)}
    />
  );
}
