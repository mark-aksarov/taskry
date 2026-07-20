"use client";

import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { Blocks, FileUp } from "lucide-react";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface ProjectCategoryManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function ProjectCategoryManageMenuTrigger({
  renderButton,
}: ProjectCategoryManageMenuTriggerProps) {
  const t = useTranslations(
    "dashboard.projectCategories.ProjectCategoryManageMenuTrigger",
  );

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportCompaniesOpenChange } = useModal(
    "importProjectCategories",
  );

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "import-csv") {
        onImportCompaniesOpenChange(true);
      } else if (key === "import-project-csv") {
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
