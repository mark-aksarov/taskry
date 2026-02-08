"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ErrorBanner } from "../../common/ErrorBanner";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { ProjectCategoryNameTextField } from "../ProjectCategoryNameTextField";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface NewProjectCategoryFormProps {
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function NewProjectCategoryForm({
  createProjectCategory,
}: NewProjectCategoryFormProps) {
  const t = useTranslations("projectCategories.NewProjectCategoryForm");

  const [state, action, pending] = useActionState(
    createProjectCategory,
    initialState,
  );

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="new-project-category-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <ProjectCategoryNameTextField />
        {state.status === "error" && (
          <ErrorBanner>{t("error.creationError")}</ErrorBanner>
        )}
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton label={t("submitButtonLabel")} />
      </FormBaseFooter>
    </FormBase>
  );
}
