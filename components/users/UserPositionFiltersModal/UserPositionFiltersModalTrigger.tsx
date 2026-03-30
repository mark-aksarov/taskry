"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function UserPositionFiltersModalTrigger() {
  const t = useTranslations("users.UserPositionFiltersModal");
  const { onOpenChange } = useModal("userPositionFilters");

  return (
    <FilterButtonMobile
      mode="single"
      label={t("label")}
      onPress={() => onOpenChange(true)}
    />
  );
}
