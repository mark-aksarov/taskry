"use client";

import { tv } from "tailwind-variants";
import { ChevronRight } from "lucide-react";
import { Link } from "react-aria-components";
import { itemStyles } from "@/components/ui/styles";
import { ListItem, ListItemInfo } from "@/components/common/List";

const styles = tv({
  base: "w-full cursor-pointer outline-none",

  variants: {
    isHovered: itemStyles.variants.isHovered,
    isFocusVisible: itemStyles.variants.isFocused,
    isDisabled: itemStyles.variants.isDisabled,
    isPressed: {
      true: "bg-gray-200 dark:bg-gray-700",
    },
  },
});

interface SearchListItemProps {
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  textSlot: React.ReactNode;
  href: string;
}

export function SearchListItem({
  titleSlot,
  textSlot,
  imageSlot,
  href,
}: SearchListItemProps) {
  return (
    <Link
      data-test="search-list-item"
      className={(renderProps) => styles({ ...renderProps })}
      href={href}
    >
      <ListItem className="rounded-none bg-inherit! pr-3 shadow-none">
        {imageSlot}
        <ListItemInfo>
          {titleSlot}
          {textSlot}
        </ListItemInfo>
        <ChevronRight
          size={16}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="text-black dark:text-white"
        />
      </ListItem>
    </Link>
  );
}
