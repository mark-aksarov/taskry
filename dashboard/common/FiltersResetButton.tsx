"use client";

import { Button } from "@/ui/Button";
import { useSearchParams } from "next/navigation";
import { useSearchBar } from "../search/SearchBar";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "./PageTransitionContext";

export function FiltersResetButton() {
  const t = useTranslations("dashboard.common.FiltersResetButton");
  const router = useRouter();
  const locale = useLocale();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { startFilteringTransition } = usePageTransition();
  const { updateValue: updateSearchBarValue } = useSearchBar();

  const handlePress = () => {
    const newSearchParams = new URLSearchParams();

    // preserve the "sort" param when resetting filters
    const sort = searchParams.get("sort");
    if (sort) newSearchParams.set("sort", sort);

    //Reset the search bar value when there are no results
    updateSearchBarValue("");

    // start the page transition and update the URL with the new searchParams
    startFilteringTransition(() => {
      router.replace(`${pathname}?${newSearchParams}`, { locale });
    });
  };

  return (
    <Button
      variant="primary"
      outlined
      label={t("label")}
      size="medium"
      onPress={handlePress}
    />
  );
}
