"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type IdType = string | number;

export interface SelectionContextType<T extends IdType, ItemType> {
  selectedIds: T[];
  selectedItems: ItemType[]; // <-- added
  items: Record<T, ItemType>;
  toggleItem: (id: T) => void;
  isSelected: (id: T) => boolean;
  updateItem: (id: T, item: ItemType) => void;
  clearSelectedIds: () => void;
}

export const SelectionContext = createContext<SelectionContextType<
  any,
  any
> | null>(null);

export const SelectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<IdType>>(new Set());
  const [items, setItems] = useState<Record<IdType, any>>({});

  const toggleItem = useCallback((id: IdType) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isSelected = useCallback(
    (id: IdType) => selectedIds.has(id),
    [selectedIds],
  );

  const updateItem = useCallback((id: IdType, item: any) => {
    setItems((prev) => ({ ...prev, [id]: item }));
  }, []);

  const clearSelectedIds = () => setSelectedIds(new Set());

  const contextValue = useMemo(() => {
    const selectedIdsArray = Array.from(selectedIds);
    const selectedItems = selectedIdsArray.map((id) => items[id]);

    return {
      selectedIds: selectedIdsArray,
      selectedItems,
      items,
      toggleItem,
      isSelected,
      updateItem,
      clearSelectedIds,
    };
  }, [
    selectedIds,
    items,
    toggleItem,
    isSelected,
    updateItem,
    clearSelectedIds,
  ]);

  return (
    <SelectionContext.Provider value={contextValue}>
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = <T extends IdType, ItemType>() => {
  const context = useContext(SelectionContext);
  if (!context)
    throw new Error("useSelection must be used within SelectionProvider");

  return context as SelectionContextType<T, ItemType>;
};
