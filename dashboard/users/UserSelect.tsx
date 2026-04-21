"use client";

import { Item } from "react-stately";
import { ResponsiveSelect } from "@/common/ResponsiveSelect";
import { useTranslations } from "next-intl";

interface UserSelectProps {
  forcedAssigneeId?: string;
  defaultSelectedKey?: string;
  items: { id: string; fullName: string }[];
}

export function UserSelect({
  forcedAssigneeId,
  defaultSelectedKey,
  items,
}: UserSelectProps) {
  const t = useTranslations("dashboard.users.UserSelect");

  const withNoAssigneeItems = [
    { id: "", label: t("noAssignee") },
    ...items.map((item) => ({ id: item.id, label: item.fullName })),
  ];

  return (
    <ResponsiveSelect
      data-test="user-select"
      name="assigneeId"
      defaultSelectedKey={defaultSelectedKey || forcedAssigneeId || ""}
      label={t("label")}
      overlayClassName="w-[var(--trigger-width)]"
      items={withNoAssigneeItems}
      className={forcedAssigneeId ? "hidden" : ""}
    >
      {(item: any) => <Item key={item.id}>{item.label}</Item>}
    </ResponsiveSelect>
  );
}
