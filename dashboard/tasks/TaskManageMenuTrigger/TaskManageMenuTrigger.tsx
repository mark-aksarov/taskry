"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";
import { Blocks, Download, FileUp, Loader2 } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface TaskManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function TaskManageMenuTrigger({
  renderButton,
}: TaskManageMenuTriggerProps) {
  const t = useTranslations("dashboard.tasks.TaskManageMenuTrigger");

  const [isPending, downloadFile] = useDownloadFile(
    "/api/tasks/export",
    "tasks.csv",
    t("successMessage"),
    t("errorMessage"),
  );

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportTasksOpenChange } = useModal("importTasks");

  function handleAction(key: Key) {
    guestGuard(async () => {
      if (key === "import-csv") {
        onImportTasksOpenChange(true);
      } else if (key === "export-csv") {
        downloadFile();
      }
    });
  }

  return (
    <ManageMenuTrigger
      renderButton={renderButton}
      onAction={handleAction}
      disabledKeys={isPending ? ["export-csv"] : []}
    >
      <Item textValue={t("importCSV")} key="import-csv">
        <FileUp    />
        {t("importCSV")}
      </Item>
      <Item textValue={t("exportCSV")} key="export-csv">
        {isPending ? (
          <Loader2
            
            
            
            className="animate-spin"
          />
        ) : (
          <Download    />
        )}
        {t("exportCSV")}
      </Item>
      <Item textValue={t("categories")} href="/task-categories">
        <Blocks    />
        {t("categories")}
      </Item>
    </ManageMenuTrigger>
  );
}
