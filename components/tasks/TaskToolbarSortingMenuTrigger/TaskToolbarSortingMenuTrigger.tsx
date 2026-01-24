"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item, Key } from "react-stately";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Calendar, CircleCheck, ALargeSmall, Blocks } from "lucide-react";

export function TaskToolbarSortingMenuTrigger() {
  const t = useTranslations("tasks.TaskToolbarSortingMenuTrigger");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleAction = (key: Key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", key as string);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { locale });
  };

  return (
    <ToolbarSortingMenuTrigger
      onAction={handleAction}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="task-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="task-toolbar-sorting-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("byTitle")} key="title">
        <ALargeSmall size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byTitle")}
      </Item>
      <Item textValue={t("byDeadline")} key="deadline">
        <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byDeadline")}
      </Item>
      <Item textValue={t("byStatus")} key="status">
        <CircleCheck size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byStatus")}
      </Item>
      <Item textValue={t("byCategory")} key="category">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCategory")}
      </Item>
    </ToolbarSortingMenuTrigger>
  );
}
