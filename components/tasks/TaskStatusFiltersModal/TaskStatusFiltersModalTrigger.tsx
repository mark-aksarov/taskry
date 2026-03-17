"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { TaskStatusFiltersModal } from "./TaskStatusFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function TaskStatusFiltersModalTrigger() {
  const t = useTranslations("tasks.TaskStatusFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <TaskStatusFiltersModal />
    </DialogTrigger>
  );
}
