"use client";

import { Key } from "react-aria";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { MenuTriggerProps } from "@/components/ui/Menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "./PageTransitionContext";
import { ResponsiveMenuTrigger } from "./ResponsiveMenuTrigger";
import { DialogHeaderWithClose } from "./DialogHeaderWithClose";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";

interface SortingMenuTriggerProps<T extends object = any>
  extends MenuTriggerProps<T> {
  clearSelectedItems?: () => void;
}

export function SortingMenuTrigger<T extends object = any>({
  clearSelectedItems,
  ...props
}: SortingMenuTriggerProps<T>) {
  const t = useTranslations("common.SortingMenuTrigger");
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
    clearSelectedItems?.();

    startSortingTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`, { locale });
    });
  };

  return (
    <ResponsiveMenuTrigger
      overlayClassName="md:min-w-[150px]"
      placement="bottom left"
      onAction={handleAction}
      selectionMode="single"
      renderDialogHeader={() => (
        <DialogHeaderWithClose>{t("dialogHeading")}</DialogHeaderWithClose>
      )}
      {...props}
    />
  );
}
