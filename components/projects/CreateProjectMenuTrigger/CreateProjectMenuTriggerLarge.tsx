"use client";

import { useTranslations } from "next-intl";
import { CreateProjectMenuTrigger } from "./CreateProjectMenuTrigger";
import { CreateNewButtonLarge } from "@/components/common/CreateNewButton";
import { useCreateProjectButtonDisabled } from "./useCreateProjectButtonDisabled";

export function CreateProjectMenuTriggerLarge() {
  const t = useTranslations("projects.CreateProjectMenuTrigger");

  const isDisabled = useCreateProjectButtonDisabled();

  return (
    <CreateProjectMenuTrigger
      renderButton={() => (
        <CreateNewButtonLarge
          data-test="create-project-menu-trigger-large"
          label={t("label")}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}
