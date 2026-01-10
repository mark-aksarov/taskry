"use client";

import {
  taskStatuses,
  ALLOWED_TASK_STATUSES_BY_PROJECT,
} from "@/lib/data/utils/statusUtils";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ResponsiveSelect } from "@/components/common/ResponsiveSelect";

interface TaskFormBaseStatusSelectProps {
  projectStatus?: ProjectStatus;
  defaultSelectedKey?: string;
}

export function TaskFormBaseStatusSelect({
  projectStatus,
  defaultSelectedKey,
}: TaskFormBaseStatusSelectProps) {
  const t = useTranslations("tasks.TaskFormBase.status");
  const tStatus = useTranslations("tasks.TaskStatus");

  let disabledKeys: string[] = [];
  if (projectStatus) {
    const allowedStatuses = ALLOWED_TASK_STATUSES_BY_PROJECT[projectStatus];
    disabledKeys = taskStatuses.filter(
      (status) =>
        !allowedStatuses.includes(status) || status === defaultSelectedKey,
    );
  }

  return (
    <ResponsiveSelect
      data-test="status-select"
      name="status"
      label={t("label")}
      defaultSelectedKey={defaultSelectedKey}
      placeholder={t("placeholder")}
      overlayClassName="w-[var(--trigger-width)]"
      disabledKeys={disabledKeys}
      isDisabled={disabledKeys.length === taskStatuses.length}
    >
      <Item key="pending">{tStatus("pending")}</Item>
      <Item key="active">{tStatus("active")}</Item>
      <Item key="completed">{tStatus("completed")}</Item>
    </ResponsiveSelect>
  );
}
