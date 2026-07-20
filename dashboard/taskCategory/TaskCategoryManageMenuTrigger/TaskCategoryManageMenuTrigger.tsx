"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, FileUp } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
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

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportCompaniesOpenChange } = useModal(
    "importTaskCategories",
  );

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
