"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { Download, FileUp, Loader2 } from "lucide-react";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface PositionManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function PositionManageMenuTrigger({
  renderButton,
}: PositionManageMenuTriggerProps) {
  const t = useTranslations("dashboard.positions.PositionManageMenuTrigger");

  const [isPending, downloadFile] = useDownloadFile(
    "/api/positions/export",
    "positions.csv",
    t("successMessage"),
    t("errorMessage"),
  );

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportPositionsOpenChange } =
    useModal("importPositions");

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "import-csv") {
        onImportPositionsOpenChange(true);
      }
      if (key === "export-csv") {
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
