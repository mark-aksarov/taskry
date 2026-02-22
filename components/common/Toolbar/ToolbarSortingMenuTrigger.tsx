"use client";

import { Key } from "react-aria";
import { useSearchParams } from "next/navigation";
import { DialogHeader } from "@/components/ui/Dialog";
import { useLocale, useTranslations } from "next-intl";
import { MenuTriggerProps } from "@/components/ui/Menu";
import { ToolbarMenuTrigger } from "./ToolbarMenuTrigger";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "../PageTransitionContext";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";

interface ToolbarSortingMenuTriggerProps<T extends object = any>
  extends MenuTriggerProps<T> {
  clearSelectedItems: () => void;
}

export function ToolbarSortingMenuTrigger<T extends object = any>({
  clearSelectedItems,
  ...props
}: ToolbarSortingMenuTriggerProps<T>) {
  const t = useTranslations("common.ToolbarSortingMenuTrigger");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startSortingTransition } = usePageTransition();

  const handleAction = (key: Key) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", key as string);
    newSearchParams.delete("page");

    // if the new searchParams are the same as the current searchParams, do nothing
    if (
      areSearchParamsEqual({
        a: searchParams,
        b: newSearchParams,
        includeKeys: ["sort"],
      })
    ) {
      return;
    }
    clearSelectedItems();

    startSortingTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`, { locale });
    });
  };

  return (
    <ToolbarMenuTrigger
      onAction={handleAction}
      selectionMode="single"
      renderDialogHeader={() => (
        <DialogHeader>{t("dialogHeading")}</DialogHeader>
      )}
      {...props}
    />
  );
}
