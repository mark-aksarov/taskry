"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/components/common/ModalManagerContext";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { useUserFilters } from "../UserFiltersContext";

export function UserPositionFiltersModalTrigger() {
  const t = useTranslations("users.UserPositionFiltersModal");
  const { onOpenChange } = useModal("userPositionFilters");
  const initialFilters = useUserFilters();

  const selectedCount = initialFilters.positionIds?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      label={t("label")}
      onPress={() => onOpenChange(true)}
    />
  );
}
