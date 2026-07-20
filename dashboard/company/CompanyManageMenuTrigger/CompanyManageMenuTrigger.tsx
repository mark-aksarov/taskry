"use client";

import { FileUp } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface CompanyManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function CompanyManageMenuTrigger({
  renderButton,
}: CompanyManageMenuTriggerProps) {
  const t = useTranslations("dashboard.companies.CompanyManageMenuTrigger");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportCompaniesOpenChange } =
    useModal("importCompanies");

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "import-csv") {
        onImportCompaniesOpenChange(true);
      }
    });
  }

  return (
    <ManageMenuTrigger renderButton={renderButton} onAction={handleAction}>
      <Item textValue={t("importCSV")} key="import-csv">
        <FileUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("importCSV")}
      </Item>
    </ManageMenuTrigger>
  );
}
