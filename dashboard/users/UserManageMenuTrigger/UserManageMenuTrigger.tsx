"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useDownloadFile } from "@/lib/hooks/useDownloadFile";
import { BriefcaseBusiness, Download, Loader2 } from "lucide-react";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface UserManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function UserManageMenuTrigger({
  renderButton,
}: UserManageMenuTriggerProps) {
  const t = useTranslations("dashboard.users.UserManageMenuTrigger");

  const [isPending, downloadFile] = useDownloadFile(
    "/api/users/export",
    "users.csv",
    t("successMessage"),
    t("errorMessage"),
  );

  const guestGuard = useGuestModalGuard();

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "export-csv") {
        downloadFile();
      }
    });
  }

  return (
    <ManageMenuTrigger renderButton={renderButton} onAction={handleAction}>
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
      <Item textValue={t("positions")} href="/positions">
        <BriefcaseBusiness    />
        {t("positions")}
      </Item>
    </ManageMenuTrigger>
  );
}
