"use client";

import { useItemsContainerRef } from "./ItemsContainerContext";

export function ItemsContainer({ children }: { children: React.ReactNode }) {
  const containerRef = useItemsContainerRef();

  return <div ref={containerRef}>{children}</div>;
}
