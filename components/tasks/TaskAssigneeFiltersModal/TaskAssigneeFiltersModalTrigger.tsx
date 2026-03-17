"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { TaskAssigneeFiltersModal } from "./TaskAssigneeFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export interface TaskAssigneeFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskAssigneeFiltersModalTrigger({
  filtersFormContainer,
}: TaskAssigneeFiltersModalTriggerProps) {
  const t = useTranslations("tasks.TaskAssigneeFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <TaskAssigneeFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
