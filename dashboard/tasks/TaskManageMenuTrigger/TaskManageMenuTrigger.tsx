"use client";

import { Blocks, FileUp } from "lucide-react";
import { Item, Key } from "react-stately";
import { useTranslations } from "next-intl";
import { useModal } from "@/common/ModalManagerContext";
import { useGuestModalGuard } from "@/lib/hooks/useGuestModalGuard";
import { ManageMenuTrigger } from "@/dashboard/common/ManageMenuTrigger";

interface TaskManageMenuTriggerProps {
  renderButton: () => React.ReactNode;
}

export function TaskManageMenuTrigger({
  renderButton,
}: TaskManageMenuTriggerProps) {
  const t = useTranslations("dashboard.tasks.TaskManageMenuTrigger");

  const guestGuard = useGuestModalGuard();

  const { onOpenChange: onImportTasksOpenChange } = useModal("importTasks");

  function handleAction(key: Key) {
    guestGuard(() => {
      if (key === "import-csv") {
        onImportTasksOpenChange(true);
      }
    });
  }

  return (
    <ManageMenuTrigger renderButton={renderButton} onAction={handleAction}>
      <Item textValue={t("importCSV")} key="import-csv">
        <FileUp size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("importCSV")}
      </Item>
      <Item textValue={t("categories")} href="/task-categories">
        <Blocks size={16} strokeWidth={1.5} absoluteStrokeWidth />
        {t("categories")}
      </Item>
    </ManageMenuTrigger>
  );
}
