"use client";

import { useTranslations } from "next-intl";
import { CreateTaskMenuTrigger } from "./CreateTaskMenuTrigger";
import { CreateNewButtonLarge } from "@/dashboard/common/CreateNewButton";
import { useCreateTaskMenuTriggerDisabled } from "./useCreateTaskMenuTriggerDisabled";

export function CreateTaskMenuTriggerLarge() {
  const t = useTranslations("dashboard.tasks.CreateTaskMenuTrigger");

  const isDisabled = useCreateTaskMenuTriggerDisabled();

  return (
    <CreateTaskMenuTrigger
      renderButton={() => (
        <CreateNewButtonLarge
          isDisabled={isDisabled}
          label={t("label")}
          data-test="create-task-menu-trigger-large"
        />
      )}
    />
  );
}
