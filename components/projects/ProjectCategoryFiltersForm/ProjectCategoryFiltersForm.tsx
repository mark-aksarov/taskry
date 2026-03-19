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
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { ProjectCategoryCheckboxGroup } from "@/components/projectCategory/ProjectCategoryCheckboxGroup";

interface ProjectCategoryFiltersFormProps {
  categoryCheckboxGroupItems: { id: number; name: string }[];
}

export function ProjectCategoryFiltersForm({
  categoryCheckboxGroupItems,
}: ProjectCategoryFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedItems } = useSelectedProjects();

  // ProjectCategoryFiltersForm can only be used inside the ProjectCategoryFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { categoryIds } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace categoryIds: remove old ones and add the new values
    newSearchParams.delete("categoryIds");
    categoryIds.forEach((id) => newSearchParams.append("categoryIds", id));

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
    <FormBase id="project-category-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <ProjectCategoryCheckboxGroup
          disableExpansion
          items={categoryCheckboxGroupItems}
          value={categoryIds}
          onChange={(value) =>
            dispatch({ type: "setCategoryIds", payload: value })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
