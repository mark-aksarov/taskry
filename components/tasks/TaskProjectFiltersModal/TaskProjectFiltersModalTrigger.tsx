"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { TaskProjectFiltersModal } from "./TaskProjectFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export interface TaskProjectFiltersModalTriggerProps {
  filtersFormContainer: React.ReactNode;
}

export function TaskProjectFiltersModalTrigger({
  filtersFormContainer,
}: TaskProjectFiltersModalTriggerProps) {
  const t = useTranslations("tasks.TaskProjectFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <TaskProjectFiltersModal filtersFormContainer={filtersFormContainer} />
    </DialogTrigger>
  );
}
