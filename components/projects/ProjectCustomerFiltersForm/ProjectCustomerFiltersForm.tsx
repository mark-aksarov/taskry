"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  useProjectFiltersForm,
  useProjectFiltersFormDispatch,
} from "../ProjectFiltersForm/ProjectFiltersFormContext";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedProjects } from "../SelectedProjectsContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { CustomerCheckboxGroup } from "@/components/customer/CustomerCheckboxGroup";

interface ProjectCustomerFiltersFormProps {
  customerCheckboxGroupItems: { id: number; fullName: string }[];
}

export function ProjectCustomerFiltersForm({
  customerCheckboxGroupItems,
}: ProjectCustomerFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedItems } = useSelectedProjects();

  // ProjectCreatorFiltersForm can only be used inside the ProjectCreatorFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { customerIds } = useProjectFiltersForm();
  const dispatch = useProjectFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace customerIds: remove old ones and add the new values
    newSearchParams.delete("customerIds");
    customerIds.forEach((id) => newSearchParams.append("customerIds", id));

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
    <FormBase id="project-customer-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CustomerCheckboxGroup
          disableExpansion
          items={customerCheckboxGroupItems}
          value={customerIds}
          onChange={(value) =>
            dispatch({ type: "setCustomerIds", payload: value })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
