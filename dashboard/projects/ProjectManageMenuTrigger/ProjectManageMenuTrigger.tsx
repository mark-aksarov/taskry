"use client";

import { Item } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks } from "lucide-react";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface ProjectManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function ProjectManageMenuTrigger({
  renderButton,
}: ProjectManageMenuTriggerProps) {
  const t = useTranslations("dashboard.projects.ProjectManageMenuTrigger");

  return (
    <ManageMenuTrigger renderButton={renderButton}>
      <Item textValue={t("categories")} href="/project-categories">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("categories")}
      </Item>
    </ManageMenuTrigger>
  );
}
