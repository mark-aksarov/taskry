"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, FileUp } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface ProjectManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function ProjectManageMenuTrigger({
  renderButton,
}: ProjectManageMenuTriggerProps) {
  const t = useTranslations("dashboard.projects.ProjectManageMenuTrigger");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportProjectsOpenChange } =
    useModal("importProjects");

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "import-csv") {
        onImportProjectsOpenChange(true);
      }
    });
  }

  return (
    <ManageMenuTrigger renderButton={renderButton} onAction={handleAction}>
      <Item textValue={t("importCSV")} key="import-csv">
        <FileUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("importCSV")}
      </Item>
      <Item
        textValue={t("categories")}
        href="/project-categories"
        key="categories"
      >
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("categories")}
      </Item>
    </ManageMenuTrigger>
  );
}
