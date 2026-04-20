"use client";

import { useTranslations } from "next-intl";
import { CreateTaskMenuTrigger } from "./CreateTaskMenuTrigger";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateTaskMenuTriggerDisabled } from "./useCreateTaskMenuTriggerDisabled";

export function CreateTaskMenuTriggerMobile() {
  const t = useTranslations("dashboard.tasks.CreateTaskMenuTrigger");

  const isDisabled = useCreateTaskMenuTriggerDisabled();

  return (
    <CreateTaskMenuTrigger
      renderButton={() => (
        <CreateNewButtonMobile
          isDisabled={isDisabled}
          aria-label={t("label")}
          data-test="create-task-menu-trigger-mobile"
        />
      )}
    />
  );
}
