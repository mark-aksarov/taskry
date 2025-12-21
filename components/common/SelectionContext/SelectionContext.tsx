"use client";

import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";

type Id = string | number;

export interface SelectionContextType<T extends Id> {
  selectedIds: T[];
  addId: (id: T) => void;
  removeId: (id: T) => void;
  toggleId: (id: T) => void;
  clearIds: () => void;
  isSelected: (id: T) => boolean;
}

export const SelectionContext = createContext<
  SelectionContextType<any> | undefined
>(undefined);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedIds, setSelectedIds] = useState<Set<Id>>(new Set());

  const addId = useCallback(
    (id: Id) => setSelectedIds((p) => new Set(p).add(id)),
    [],
  );

  const removeId = useCallback(
    (id: Id) =>
      setSelectedIds((p) => {
        const n = new Set(p);
        n.delete(id);
        return n;
      }),
    [],
  );

  const toggleId = useCallback((id: Id) => {
    setSelectedIds((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }, []);

  const clearIds = useCallback(() => setSelectedIds(new Set()), []);
  const isSelected = useCallback(
    (id: Id) => selectedIds.has(id),
    [selectedIds],
  );

  const value = useMemo(
    () => ({
      selectedIds: Array.from(selectedIds),
      addId,
      removeId,
      toggleId,
      clearIds,
      isSelected,
    }),
    [selectedIds, addId, removeId, toggleId, isSelected],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
};
