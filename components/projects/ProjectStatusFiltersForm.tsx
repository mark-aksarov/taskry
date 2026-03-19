"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "./ProjectFiltersForm";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { ProjectStatus } from "@/generated/prisma/enums";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedProjects } from "./SelectedProjectsContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { ProjectStatusCheckboxGroup } from "./ProjectStatusCheckboxGroup";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";

export function ProjectStatusFiltersForm() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedItems } = useSelectedProjects();

  // ProjectCreatorFiltersForm can only be used inside the ProjectCreatorFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { statuses } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace statuses: remove old ones and add the new values
    newSearchParams.delete("statuses");
    statuses.forEach((status) => newSearchParams.append("statuses", status));

    // Reset pagination
    newSearchParams.delete("page");

    // Clear the selected items in list / grid
    clearSelectedItems?.();

    // Start the page transition and update the URL with new search params
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, { locale });
    });
  };

  return (
    <FormBase id="project-status-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectStatusCheckboxGroup
          value={statuses}
          onChange={(value) =>
            dispatch({ type: "setStatuses", payload: value as ProjectStatus[] })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
