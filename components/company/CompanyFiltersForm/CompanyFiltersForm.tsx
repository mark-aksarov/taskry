"use client";

import {
  CompanyCheckboxGroup,
  useCompanyCheckboxGroup,
} from "../CompanyCheckboxGroup";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { useSelectedItems } from "@/components/common/SelectedItemsContext";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface CompanyFiltersFormProps {
  companyCheckboxGroupItems: { id: number; name: string }[];
}

export function CompanyFiltersForm({
  companyCheckboxGroupItems,
}: CompanyFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();
  const { clear: clearSelectedItems } = useSelectedItems();

  // CompanyFiltersForm can only be used inside the CompanyFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { value: companyIds } = useCompanyCheckboxGroup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace companyIds: remove old ones and add the new values
    newSearchParams.delete("companyIds");
    companyIds.forEach((id) => newSearchParams.append("companyIds", id));

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
    <FormBase id="company-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CompanyCheckboxGroup
          disableExpansion
          items={companyCheckboxGroupItems}
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
