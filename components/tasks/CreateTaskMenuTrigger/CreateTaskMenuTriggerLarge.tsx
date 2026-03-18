"use client";

import { useTranslations } from "next-intl";
import { CreateTaskMenuTrigger } from "./CreateTaskMenuTrigger";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreateTaskMenuTriggerDisabled } from "./useCreateTaskMenuTriggerDisabled";

export function CreateTaskMenuTriggerLarge() {
  const t = useTranslations("tasks.CreateTaskMenuTrigger");

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
