"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { Blocks, Download, FileUp, Loader2 } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
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

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportProjectsOpenChange } =
    useModal("importProjects");

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "import-csv") {
        onImportProjectsOpenChange(true);
      } else if (key === "export-csv") {
        downloadFile();
      }
    });
  }

  return (
    <ManageMenuTrigger renderButton={renderButton} onAction={handleAction}>
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
      <Item
        textValue={t("categories")}
        href="/project-categories"
        key="categories"
      >
        <Blocks    />
        {t("categories")}
      </Item>
    </ManageMenuTrigger>
  );
}
