"use client";

import {
  SelectedItem,
  useSelectedItemsState,
} from "@/lib/hooks/useSelectedItemsState";
import { usePress } from "@react-aria/interactions";

interface SelectableItemProps<T extends SelectedItem> {
  item: T;
  add: ReturnType<typeof useSelectedItemsState<T>>["add"];
  remove: ReturnType<typeof useSelectedItemsState<T>>["remove"];
  get: ReturnType<typeof useSelectedItemsState<T>>["get"];
  children: React.ReactNode;
  isPending: boolean;
}

export function SelectableItem<T extends SelectedItem>({
  item,
  add,
  remove,
  get,
  children,
  isPending,
}: SelectableItemProps<T>) {
  const { pressProps } = usePress({
    onPress: () => {
      if (get(item.id)) remove(item.id);
      else add(item);
    },
  });

  return (
    <div {...pressProps} className={isPending ? "pointer-events-none" : ""}>
      {children}
    </div>
  );
}
