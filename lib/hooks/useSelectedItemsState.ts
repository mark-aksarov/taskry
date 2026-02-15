import { useCallback, useMemo, useState } from "react";

export interface SelectedItem {
  id: number;
}

export const useSelectedItemsState = <
  T extends SelectedItem = SelectedItem,
>() => {
  const [items, setItems] = useState<T[]>([]);

  const add = useCallback((item: T) => {
    setItems((prev) => [...prev, item]);
  }, []);

  const update = useCallback((id: number, updatedItem: Partial<T>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)),
    );
  }, []);

  const remove = useCallback((id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const get = useCallback(
    (id: number) => items.find((item) => item.id === id),
    [items],
  );

  const clear = useCallback(() => {
    setItems([]);
  }, []);

  const ids = useMemo(() => items.map((item) => item.id), [items]);

  return {
    add,
    update,
    remove,
    get,
    clear,
    items,
    ids,
  };
};
