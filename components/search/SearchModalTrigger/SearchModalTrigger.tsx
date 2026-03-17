"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/components/ui/styles";
import { useSearchBar } from "../SearchBar";
import { mergeProps, useFocusRing, usePress } from "react-aria";
import { SearchModalTriggerIcon } from "./SearchModalTriggerIcon";
import { SearchModalTriggerText } from "./SearchModalTriggerText";
import { useSearchModal } from "../SearchModal/SearchModalContext";
import { usePageTransition } from "@/components/common/PageTransitionContext";
import { SearchModalTriggerPlaceholder } from "./SearchModalTriggerPlaceholder";
import { SearchModalTriggerClearButton } from "./SearchModalTriggerClearButton";

export const styles = tv({
  extend: focusRing,
  base: "flex flex-auto cursor-text items-center justify-between gap-2 rounded-full border-white bg-white p-2 pl-4 md:max-w-[360px] dark:border-gray-900 dark:bg-gray-800",
  variants: {
    isDisabled: {
      true: "text-gray-500 dark:text-gray-400",
    },
  },
});

export function SearchModalTrigger() {
  //sync trigger content with search bar value
  const { value: searchBarValue } = useSearchBar();
  const { isFilteringPending } = usePageTransition();
  const { onOpenChange } = useSearchModal();

  const isDisabled = isFilteringPending;

  let { focusProps, isFocusVisible } = useFocusRing();
  let { pressProps } = usePress({
    onPress: () => {
      onOpenChange(true);
    },
    isDisabled,
  });

  return (
    <div
      {...mergeProps(focusProps, pressProps)}
      role="button"
      tabIndex={0}
      data-test="search-modal-trigger"
      className={styles({ isFocusVisible, isDisabled })}
    >
      {searchBarValue ? (
        <>
          <SearchModalTriggerText />
          <SearchModalTriggerClearButton />
        </>
      ) : (
        <>
          <SearchModalTriggerPlaceholder />
          <SearchModalTriggerIcon />
        </>
      )}
    </div>
  );
}
