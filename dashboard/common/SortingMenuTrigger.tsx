"use client";

import { Key } from "react-aria";
import { MenuTriggerProps } from "@/ui/Menu";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { usePageTransition } from "./PageTransitionContext";
import { ResponsiveMenuTrigger } from "@/common/ResponsiveMenuTrigger";
import { DialogHeaderWithClose } from "@/common/DialogHeaderWithClose";

interface SortingMenuTriggerProps<T extends object = any>
  extends MenuTriggerProps<T> {
  clearSelectedItems?: () => void;
}

export function SortingMenuTrigger<T extends object = any>({
  clearSelectedItems,
  ...props
}: SortingMenuTriggerProps<T>) {
  const t = useTranslations("dashboard.common.SortingMenuTrigger");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startSortingTransition } = usePageTransition();

  const handleAction = (key: Key) => {
    const newSort = key as string;

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sort", newSort);
    newSearchParams.delete("page");

    // if the new old sort param is the same as the current sort param, do nothing
    const currentSort = searchParams.get("sort");
    if (currentSort === newSort) return;

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
