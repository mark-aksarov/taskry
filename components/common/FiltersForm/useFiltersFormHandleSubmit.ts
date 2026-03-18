import {
  formDataToSearchParams,
  normalizeBooleanFields,
} from "@/lib/utils/formDataUtils";

import { useContext } from "react";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "../PageTransitionContext";
import { OverlayTriggerStateContext } from "react-aria-components";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";

export function useFiltersFormHandleSubmit({
  clearSelectedItems,
  booleanFieldNames = [],
  preserve,
}: {
  clearSelectedItems?: () => void;
  booleanFieldNames?: string[];
  preserve?: string[];
}) {
  const overlayContext = useContext(OverlayTriggerStateContext);

  if (!overlayContext) {
    throw new Error(
      "FiltersFormResetButton must be used within a OverlayTriggerStateContext.Provider",
    );
  }

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { startFilteringTransition } = usePageTransition();
  const searchParams = useSearchParams();

  const { close: closeModal } = overlayContext;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // close the form modal immediately
    closeModal();

    const formData = new FormData(e.currentTarget);

    // transform "on" to "true" and remove unchecked checkboxes from formData
    normalizeBooleanFields(formData, booleanFieldNames);

    // convert formData to URLSearchParams and remove empty values
    const newSearchParams = formDataToSearchParams(formData);

    // preserve params (can contain arbitrary keys, including multi-value like category)
    preserve?.forEach((key) => {
      const values = searchParams.getAll(key);

      values.forEach((value) => {
        newSearchParams.append(key, value);
      });
    });

    // reset pagination when applying new filters
    newSearchParams.delete("page");

    // if the new searchParams are the same as the current searchParams, do nothing
    if (
      areSearchParamsEqual({
        a: searchParams,
        b: newSearchParams,
        excludeKeys: ["page", "sort", "pageSize"],
      })
    ) {
      return;
    }
    clearSelectedItems?.();

    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`, {
        locale,
      });
    });
  };

  return handleSubmit;
}
