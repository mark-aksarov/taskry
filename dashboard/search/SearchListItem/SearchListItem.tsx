"use client";

import { tv } from "tailwind-variants";
import { itemStyles } from "@/ui/styles";
import { Button, Link } from "react-aria-components";
import { SearchListItemContent } from "./SearchListItemContent";

interface SearchListItemProps {
  value: string;
  onPress: (value: string) => void;
}

const styles = tv({
  base: "flex w-full cursor-pointer items-center justify-between gap-4 py-4 pr-4 pl-6 outline-none",

  variants: {
    isHovered: itemStyles.variants.isHovered,
    isFocusVisible: itemStyles.variants.isFocused,
    isDisabled: itemStyles.variants.isDisabled,
    isPressed: {
      true: "bg-(--surface-primary-pressed)",
    },
  },
});

export function SearchListItem({ onPress, value }: SearchListItemProps) {
  return (
    <Button onPress={() => onPress?.(value)} className={styles}>
      <SearchListItemContent>{value}</SearchListItemContent>
    </Button>
  );
}

interface SearchListItemLinkProps {
  value: string;
  pathname: string;
  onPress?: (value: string) => void;
}

export function SearchListItemLink({
  value,
  onPress,
  pathname,
}: SearchListItemLinkProps) {
  return (
    <Link
      href={`${pathname}?query=${value}`}
      onPress={() => onPress?.(value)}
      className={styles}
    >
      <SearchListItemContent>{value}</SearchListItemContent>
    </Link>
  );
}
