"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { Download, Upload, Loader2 } from "lucide-react";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface TaskCategoryManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function TaskCategoryManageMenuTrigger({
  renderButton,
}: TaskCategoryManageMenuTriggerProps) {
  const t = useTranslations(
    "dashboard.taskCategories.TaskCategoryManageMenuTrigger",
  );

  const [isPending, downloadFile] = useDownloadFile(
    "/api/task-categories/export",
    "taskCategories.csv",
    t("errorMessage"),
  );

  const { onOpenChange: onImportCompaniesOpenChange } = useModal(
    "importTaskCategories",
  );

  function handleAction(key: Key) {
    if (key === "import-csv") {
      onImportCompaniesOpenChange(true);
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
    </ManageMenuTrigger>
  );
}
