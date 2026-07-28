"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";
import { Building2, Download, Upload, Loader2 } from "lucide-react";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface ClientManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function ClientManageMenuTrigger({
  renderButton,
}: ClientManageMenuTriggerProps) {
  const t = useTranslations("dashboard.clients.ClientManageMenuTrigger");

  const [isPending, downloadFile] = useDownloadFile(
    "/api/clients/export",
    "clients.csv",
    t("successMessage"),
    t("errorMessage"),
  );

  const { onOpenChange: onImportProjectsOpenChange } =
    useModal("importClients");

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
      <Item textValue={t("companies")} href="/companies">
        <Building2 />
        {t("companies")}
      </Item>
    </ManageMenuTrigger>
  );
}
