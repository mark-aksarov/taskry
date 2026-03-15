"use client";

import { PressEvent } from "react-aria";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { useSearchBar } from "../search/SearchBar";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "./PageTransitionContext";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";

export function FiltersResetButton() {
  const t = useTranslations("common.FiltersResetButton");
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { startFilteringTransition } = usePageTransition();
  const { updateValue: updateSearchBarValue } = useSearchBar();

  const handlePress = (e: PressEvent) => {
    const newSearchParams = new URLSearchParams();

    // preserve the "sort" param when resetting filters
    const sort = searchParams.get("sort");
    if (sort) newSearchParams.set("sort", sort);

    //Reset the search query when there are no results,
    //because the current search query may lead to empty results.
    updateSearchBarValue("");

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

    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`, { locale });
    });
  };

  return (
    <Button
      variant="outlined"
      label={t("label")}
      size="medium"
      onPress={handlePress}
    />
  );
}
