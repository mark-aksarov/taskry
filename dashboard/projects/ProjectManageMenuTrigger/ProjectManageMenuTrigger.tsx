"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { Blocks, Download, Upload, Loader2 } from "lucide-react";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";

interface ProjectManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function ProjectManageMenuTrigger({
  renderButton,
}: ProjectManageMenuTriggerProps) {
  const t = useTranslations("dashboard.projects.ProjectManageMenuTrigger");

  const [isPending, downloadFile] = useDownloadFile(
    "/api/projects/export",
    "projects.csv",
    t("successMessage"),
    t("errorMessage"),
  );

  const { onOpenChange: onImportProjectsOpenChange } =
    useModal("importProjects");

  function handleAction(key: Key) {
    if (key === "import-csv") {
      onImportProjectsOpenChange(true);
    } else if (key === "export-csv") {
      downloadFile();
    }
  }

  return (
    <ManageMenuTrigger renderButton={renderButton} onAction={handleAction}>
      <Item textValue={t("importCSV")} key="import-csv">
        <Upload />
        {t("importCSV")}
      </Item>
      <Item textValue={t("exportCSV")} key="export-csv">
        {isPending ? <Loader2 className="animate-spin" /> : <Download />}
        {t("exportCSV")}
      </Item>
      <Item
        textValue={t("categories")}
        href="/project-categories"
        key="categories"
      >
        <Blocks />
        {t("categories")}
      </Item>
    </ManageMenuTrigger>
  );
}
