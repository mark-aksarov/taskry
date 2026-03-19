"use client";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { ProjectCreatorCheckboxGroup } from "../ProjectCreatorCheckboxGroup";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface ProjectCreatorFiltersFormProps {
  creatorCheckboxGroupItems: { id: string; fullName: string }[];
}

export function ProjectCreatorFiltersForm({
  creatorCheckboxGroupItems,
}: ProjectCreatorFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedItems } = useSelectedProjects();

  // ProjectCreatorFiltersForm can only be used inside the ProjectCreatorFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { creatorIds } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace creatorIds: remove old ones and add the new values
    newSearchParams.delete("creatorIds");
    creatorIds.forEach((id) => newSearchParams.append("creatorIds", id));

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
    <FormBase id="project-creator-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectCreatorCheckboxGroup
          disableExpansion
          items={creatorCheckboxGroupItems}
          value={creatorIds}
          onChange={(value) =>
            dispatch({ type: "setCreatorIds", payload: value })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
