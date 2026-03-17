"use client";

import { useTranslations } from "next-intl";
import { CreateTaskMenuTrigger } from "./CreateTaskMenuTrigger";
import { CreateNewButtonMobile } from "@/components/common/CreateNewButton";
import { useCreateTaskButtonDisabled } from "./useCreateTaskButtonDisabled";

export function CreateTaskMenuTriggerMobile() {
  const t = useTranslations("tasks.CreateTaskMenuTriggerMobile");

  const isDisabled = useCreateTaskButtonDisabled();

  return (
    <CreateTaskMenuTrigger
      renderButton={() => (
        <CreateNewButtonMobile
          data-test="create-task-menu-trigger-mobile"
          aria-label={t("buttonAriaLabel")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
