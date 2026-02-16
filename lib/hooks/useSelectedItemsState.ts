import { useEffect, useState, useCallback, useMemo } from "react";

export interface SelectedItem {
  id: number;
}

export function useSelectedItemsState<T extends SelectedItem = SelectedItem>(
  pageItems: T[],
) {
  const [items, setItems] = useState<T[]>([]);

  const ids = useMemo(() => items.map((i) => i.id), [items]);

  const add = useCallback((item: T) => {
    setItems((prev) =>
      prev.some((i) => i.id === item.id) ? prev : [...prev, item],
    );
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const get = useCallback(
    (id: number) => items.find((i) => i.id === id),
    [items],
  );

  useEffect(() => {
    setItems((prev) =>
      pageItems.filter((p) => prev.some((i) => i.id === p.id)),
    );
  }, [pageItems]);

  return { items, ids, add, remove, get };
}
