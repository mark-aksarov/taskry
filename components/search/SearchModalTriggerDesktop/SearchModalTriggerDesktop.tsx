"use client";

import { Search } from "lucide-react";
import { tv } from "tailwind-variants";
import { useTranslations } from "next-intl";
import { focusRing, RACButton, RACDialogTrigger } from "@/components/ui";

export const styles = tv({
  extend: focusRing,
  base: "flex max-w-[360px] flex-auto cursor-text items-center justify-between gap-2 rounded-full border-white bg-white px-4 py-3 text-sm text-gray-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-400",
});

export function SearchModalTriggerDesktop({
  modal,
}: {
  modal: React.ReactNode;
}) {
  const t = useTranslations("search.SearchModalTriggerDesktop");

  return (
    <RACDialogTrigger>
      <RACButton className={styles}>
        {t("label")}
        <Search
          size={18}
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="text-black dark:text-white"
        />
      </RACButton>
      {modal}
    </RACDialogTrigger>
  );
}
