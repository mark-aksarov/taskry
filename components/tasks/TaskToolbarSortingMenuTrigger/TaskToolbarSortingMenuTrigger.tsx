"use client";

import {
  ToolbarSortingMenuTrigger,
  ToolbarSortingButtonMobile,
  ToolbarSortingButtonDesktop,
} from "@/components/common/Toolbar";

import { Item, Key } from "react-stately";
import { TaskSortField } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSelectedTasks } from "../SelectedTasksContext";
import { areSearchParamsEqual } from "@/lib/utils/areSearchParamsEqual";
import { Calendar, CircleCheck, ALargeSmall, Blocks } from "lucide-react";
import { usePageTransition } from "@/components/common/PageTransitionContext";

interface TaskToolbarSortingMenuTriggerProps {
  selectedSortField: TaskSortField;
}

export function TaskToolbarSortingMenuTrigger({
  selectedSortField,
}: TaskToolbarSortingMenuTriggerProps) {
  const t = useTranslations("tasks.TaskToolbarSortingMenuTrigger");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startSortingTransition } = usePageTransition();
  const { clear: clearSelectedTasks } = useSelectedTasks();

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
    clearSelectedTasks();

    startSortingTransition(() => {
      router.replace(`${pathname}?${newSearchParams.toString()}`, { locale });
    });
  };

  return (
    <ToolbarSortingMenuTrigger
      selectedKeys={[selectedSortField]}
      onAction={handleAction}
      renderButton={() => (
        <>
          <ToolbarSortingButtonMobile data-test="task-toolbar-sorting-button-mobile" />
          <ToolbarSortingButtonDesktop data-test="task-toolbar-sorting-button-desktop" />
        </>
      )}
    >
      <Item textValue={t("byCreatedAt")} key="createdAt">
        <Calendar size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("byCreatedAt")}
      </Item>
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
