"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { TaskCategoryFiltersModal } from "./TaskCategoryFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export interface TaskCategoryFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskCategoryFiltersModalTrigger({
  filtersFormContainer,
}: TaskCategoryFiltersModalTriggerProps) {
  const t = useTranslations("tasks.TaskCategoryFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <TaskCategoryFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
