"use client";

import { tv } from "tailwind-variants";
import { focusRing } from "@/ui/styles";
import { useSearchBar } from "../SearchBar";
import { mergeProps, useFocusRing, usePress } from "react-aria";
import { SearchModalTriggerIcon } from "./SearchModalTriggerIcon";
import { SearchModalTriggerText } from "./SearchModalTriggerText";
import { useModal } from "@/common/ModalManagerContext";
import { usePageTransition } from "@/dashboard/common/PageTransitionContext";
import { SearchModalTriggerPlaceholder } from "./SearchModalTriggerPlaceholder";
import { SearchModalTriggerClearButton } from "./SearchModalTriggerClearButton";

export const styles = tv({
  extend: focusRing,
  base: [
    "flex flex-auto items-center justify-between",
    "cursor-text",
    "gap-2 p-2 pl-4",
    "rounded-full",
    "md:max-w-[360px]",
    "bg-(--surface-1)",
  ],
  variants: {
    isDisabled: {
      true: "text-(--text-secondary)",
    },
  },
});

export function SearchModalTrigger() {
  //sync trigger content with search bar value
  const { value: searchBarValue } = useSearchBar();
  const { isFilteringPending } = usePageTransition();
  const { onOpenChange } = useModal("search");

  const isDisabled = isFilteringPending;

  const { focusProps, isFocusVisible } = useFocusRing();
  const { pressProps } = usePress({
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
