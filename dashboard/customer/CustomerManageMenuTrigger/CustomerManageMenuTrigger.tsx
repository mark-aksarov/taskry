"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Building2, Download, FileUp, Loader2 } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";

interface CustomerManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CustomerManageMenuTrigger({
  renderButton,
}: CustomerManageMenuTriggerProps) {
  const t = useTranslations("dashboard.customers.CustomerManageMenuTrigger");

  const [isPending, downloadFile] = useDownloadFile(
    "/api/customers/export",
    "customers.csv",
    t("successMessage"),
    t("errorMessage"),
  );

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportProjectsOpenChange } =
    useModal("importCustomers");

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
      <Item textValue={t("companies")} href="/companies">
        <Building2 size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("companies")}
      </Item>
    </ManageMenuTrigger>
  );
}
