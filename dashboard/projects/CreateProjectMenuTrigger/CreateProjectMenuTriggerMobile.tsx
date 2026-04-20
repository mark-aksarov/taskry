"use client";

import { useTranslations } from "next-intl";
import { CreateProjectMenuTrigger } from "./CreateProjectMenuTrigger";
import { CreateNewButtonMobile } from "@/dashboard/common/CreateNewButton";
import { useCreateProjectButtonDisabled } from "./useCreateProjectButtonDisabled";

export function CreateProjectMenuTriggerMobile() {
  const t = useTranslations("dashboard.projects.CreateProjectMenuTrigger");

  const isDisabled = useCreateProjectButtonDisabled();

  return (
    <CreateProjectMenuTrigger
      renderButton={() => (
        <CreateNewButtonMobile
          data-test="create-project-menu-trigger-mobile"
          aria-label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
