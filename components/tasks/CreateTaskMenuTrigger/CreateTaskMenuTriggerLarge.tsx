"use client";

import { useTranslations } from "next-intl";
import { CreateTaskMenuTrigger } from "./CreateTaskMenuTrigger";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreateTaskButtonDisabled } from "./useCreateTaskButtonDisabled";

export function CreateTaskMenuTriggerLarge() {
  const t = useTranslations("tasks.CreateTaskMenuTriggerLarge");

  const isDisabled = useCreateTaskButtonDisabled();

  return (
    <CreateTaskMenuTrigger
      renderButton={() => (
        <CreateNewButtonLarge
          data-test="create-task-menu-trigger-large"
          label={t("buttonLabel")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
