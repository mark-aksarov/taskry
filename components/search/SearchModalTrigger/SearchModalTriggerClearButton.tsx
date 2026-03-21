import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchBar } from "../SearchBar";
import { Button } from "@/components/ui/Button";
import { useSearchParams } from "next/navigation";
import { useApplyFilterURL } from "@/lib/hooks/useApplyFilterURL";
import { usePageTransition } from "@/components/common/PageTransitionContext";

// FIXME (non-critical): clearSelectedItems to also reset selected items
// NOTE: Selected items are synced with rendered page items,
// so items not present on the current page after searchParams update are automatically cleared
export function SearchModalTriggerClearButton() {
  const t = useTranslations("search.SearchModalTrigger");

  const searchParams = useSearchParams();

  const { updateValue: updateSearchBarValue } = useSearchBar();
  const { isFilteringPending } = usePageTransition();

  const applyFilterURL = useApplyFilterURL();

  const handlePress = () => {
    // reset the search bar value and apply the search query
    updateSearchBarValue("");

    // Create new search params based on the current ones
    const newSearchParams = new URLSearchParams(searchParams);

    // delete the search query
    newSearchParams.delete("query");

    applyFilterURL(newSearchParams);
  };

  return (
    <Button
      variant="ghost"
      className="rounded-full text-inherit"
      onPress={handlePress}
      aria-label={t("clearButtonLabel")}
      iconLeft={<X size={18} strokeWidth={1.5} absoluteStrokeWidth />}
      // Disable clear button while filtering
      isDisabled={isFilteringPending}
    />
  );
}
