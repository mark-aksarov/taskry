"use client";

import { createContext, useContext, useRef, RefObject } from "react";

const ItemsContainerContext =
  createContext<RefObject<HTMLDivElement | null> | null>(null);

export function ItemsContainerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ItemsContainerContext.Provider value={containerRef}>
      {children}
    </ItemsContainerContext.Provider>
  );
}

export function useItemsContainerRef() {
  const context = useContext(ItemsContainerContext);
  if (!context) {
    throw new Error(
      "useItemsContainerRef must be used within a ItemsContainerProvider",
    );
  }
  return context;
}
