"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectCategoryNameTextField } from "../ProjectCategoryNameTextField";

interface NewProjectCategoryFormProps {
  createProjectCategory: ActionFn<ActionState, FormData>;
}

export function NewProjectCategoryForm({
  createProjectCategory,
}: NewProjectCategoryFormProps) {
  const t = useTranslations("projectCategories.NewProjectCategoryForm");

  const [state, action, isPending] = useFormBaseActionState(
    createProjectCategory,
  );

  return (
    <FormBase
      id="new-project-category-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <ProjectCategoryNameTextField />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {state.message}
        </FormErrorBanner>
      </FormBaseBody>
      <FormBaseFooter>
        <FormBaseSubmitButton
          isPending={isPending}
          label={t("submitButtonLabel")}
        />
      </FormBaseFooter>
    </FormBase>
  );
}
