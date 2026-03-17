"use client";

import { useTranslations } from "next-intl";
import { DialogTrigger } from "react-aria-components";
import { ProjectStatusFiltersModal } from "./ProjectStatusFiltersModal";
import { FilterButtonMobile } from "@/components/common/FilterButton";

export function ProjectStatusFiltersModalTrigger() {
  const t = useTranslations("projects.ProjectStatusFiltersModalTrigger");

  return (
    <DialogTrigger>
      <FilterButtonMobile mode="single" label={t("buttonLabel")} />
      <ProjectStatusFiltersModal />
    </DialogTrigger>
  );
}
