"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { AssigneeFiltersModal } from "./AssigneeFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export interface AssigneeFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function AssigneeFiltersModalTrigger({
  filtersFormContainer,
}: AssigneeFiltersModalTriggerProps) {
  const t = useTranslations("tasks.AssigneeFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <AssigneeFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
