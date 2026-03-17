"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks } from "lucide-react";
import { ManageMenuTrigger } from "@/components/common/ManageMenuTrigger";

interface TaskManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function TaskManageMenuTrigger({
  renderButton,
}: TaskManageMenuTriggerProps) {
  const t = useTranslations("tasks.TaskManageMenuTrigger");

  return (
    <ManageMenuTrigger renderButton={renderButton}>
      <Item textValue={t("categories")} href="/task-categories">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("categories")}
      </Item>
    </ManageMenuTrigger>
  );
}
