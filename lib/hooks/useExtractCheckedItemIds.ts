import { useViewMode } from "@/components/common/ViewMode";
import { useCallback } from "react";

export const useExtractCheckedItemIds = <T extends number | string = number>(
  prefix: string,
  asNumber: boolean = true,
): (() => T[]) => {
  const { containerRef } = useViewMode();

  return useCallback(() => {
    const container = containerRef.current;

    if (!container) {
      throw new Error("containerRef.current is null");
    }

    const selector = `input[id^="${prefix}"]:checked`;
    const elements = container.querySelectorAll<HTMLInputElement>(selector);

    return Array.from(elements).map((el) => {
      const idValue = el.id.slice(prefix.length);
      return (asNumber ? Number(idValue) : idValue) as T;
    });
  }, [containerRef, prefix, asNumber]);
};
