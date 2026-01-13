"use client";

import { tv } from "tailwind-variants";
import { ChevronRight } from "lucide-react";
import { focusRing, RACButton } from "@/components/ui";
import { ListItem, ListItemInfo } from "@/components/common/List";

interface SearchListItemProps {
  imageSlot: React.ReactNode;
  titleSlot: React.ReactNode;
  textSlot: React.ReactNode;
}

const styles = tv({
  extend: focusRing,
  base: "cursor-poiner pressed:bg-gray-300 dark:pressed:bg-gray-700 w-full bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-600",
});

export function SearchListItem({
  titleSlot,
  textSlot,
  imageSlot,
}: SearchListItemProps) {
  return (
    <RACButton className={(renderProps) => styles({ ...renderProps })}>
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
    </RACButton>
  );
}
