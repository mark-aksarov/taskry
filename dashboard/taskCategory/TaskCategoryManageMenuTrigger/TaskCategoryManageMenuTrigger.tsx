"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { Download, FileUp, Loader2 } from "lucide-react";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
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
    t("successMessage"),
    t("errorMessage"),
  );

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportCompaniesOpenChange } = useModal(
    "importTaskCategories",
  );

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "import-csv") {
        onImportCompaniesOpenChange(true);
      } else if (key === "export-csv") {
        downloadFile();
      }
    });
  }

  return (
    <ManageMenuTrigger renderButton={renderButton} onAction={handleAction}>
      <Item textValue={t("importCSV")} key="import-csv">
        <FileUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("importCSV")}
      </Item>
      <Item textValue={t("exportCSV")} key="export-csv">
        {isPending ? (
          <Loader2
            size={16}
            strokeWidth={1.5}
            absoluteStrokeWidth
            className="animate-spin"
          />
        ) : (
          <Download size={16} strokeWidth={1.5} absoluteStrokeWidth />
        )}
        {t("exportCSV")}
      </Item>
    </ManageMenuTrigger>
  );
}
