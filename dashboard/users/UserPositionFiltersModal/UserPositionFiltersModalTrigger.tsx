"use client";

import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { FilterButtonMobile } from "@/dashboard/common/FilterButton";
import { useUserFilters } from "../UserFiltersContext";

export function UserPositionFiltersModalTrigger() {
  const t = useTranslations("dashboard.users.UserPositionFiltersModal");
  const { onOpenChange } = useModal("userPositionFilters");
  const initialFilters = useUserFilters();

  const selectedCount = initialFilters.positionIds?.length ?? 0;

  return (
    <FilterButtonMobile
      mode="single"
      selectedCount={selectedCount}
      className={selectedCount ? "order-2" : "order-3"}
      label={t("label")}
      onPress={() => onOpenChange(true)}
    />
  );
}
