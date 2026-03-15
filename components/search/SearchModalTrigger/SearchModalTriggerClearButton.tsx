import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { useApplySearchQuery } from "../useApplySearchQuery";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { useSearchBar } from "../SearchBar";

export function SearchModalTriggerClearButton() {
  const t = useTranslations("search.SearchModalTrigger");

  const { updateValue: updateSearchBarValue } = useSearchBar();
  const { isFilteringPending } = usePageTransition();

  // FIXME (non-critical): clearSelectedItems to also reset selected items
  // NOTE: Selected items are synced with rendered page items,
  // so items not present on the current page after searchParams update are automatically cleared
  const applySearchQuery = useApplySearchQuery();

  const handlePress = () => {
    // reset the search bar value and apply the search query
    updateSearchBarValue("");
    applySearchQuery("");
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
