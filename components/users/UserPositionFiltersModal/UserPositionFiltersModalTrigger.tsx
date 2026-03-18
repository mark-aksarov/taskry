"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { FilterButtonMobile } from "@/components/common/FilterButton";
import { UserPositionFiltersModal } from "./UserPositionFiltersModal";

export interface UserPositionFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function UserPositionFiltersModalTrigger({
  filtersFormContainer,
}: UserPositionFiltersModalTriggerProps) {
  const t = useTranslations("users.UserPositionFiltersModal");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("label")} />
      <UserPositionFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
