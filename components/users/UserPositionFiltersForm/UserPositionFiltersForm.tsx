"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
} from "@/components/common/FormBase";

import {
  useUserFiltersForm,
  useUserFiltersFormDispatch,
} from "../UserFiltersForm/UserFiltersFormContext";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { PositionCheckboxGroup } from "../PositionCheckboxGroup";
import { OverlayTriggerStateContext } from "react-aria-components";
import { FiltersFormSubmitButton } from "@/components/common/FiltersForm";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface UserPositionFiltersFormProps {
  positionCheckboxGroupItems: { id: number; name: string }[];
}

export function UserPositionFiltersForm({
  positionCheckboxGroupItems,
}: UserPositionFiltersFormProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startFilteringTransition } = usePageTransition();

  // CustomerCompanyFiltersForm can only be used inside the CustomerCompanyFiltersModal
  const { close: closeModal } = useContext(OverlayTriggerStateContext)!;

  const { positionIds } = useUserFiltersForm();
  const dispatch = useUserFiltersFormDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // Replace positionIds: remove old ones and add the new values
    newSearchParams.delete("positionIds");
    positionIds.forEach((id) => newSearchParams.append("positionIds", id));

    // Reset pagination
    newSearchParams.delete("page");

    // Start the page transition and update the URL with new search params
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, { locale });
    });
  };

  return (
    <FormBase id="user-position-filter-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <PositionCheckboxGroup
          items={positionCheckboxGroupItems}
          disableExpansion
          value={positionIds}
          onChange={(value) =>
            dispatch({ type: "setPositionIds", payload: value })
          }
        />
      </FormBaseBody>
      <FormBaseFooter>
        <FiltersFormSubmitButton />
      </FormBaseFooter>
    </FormBase>
  );
}
