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
import { ProjectCategoryNameTextField } from "./ProjectCategoryNameTextField";

interface EditProjectCategoryFormProps {
  projectCategoryId: number;
  nameDefaultValue: string;
  updateProjectCategory: ActionFn<ActionState, FormData>;
}

export function EditProjectCategoryForm({
  projectCategoryId,
  nameDefaultValue,
  updateProjectCategory,
}: EditProjectCategoryFormProps) {
  const t = useTranslations("projectCategories.EditProjectCategoryForm");

  const [state, action, isPending] = useFormBaseActionState(
    updateProjectCategory,
  );

  return (
    <FormBase
      id="edit-project-category-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <input type="hidden" name="id" value={projectCategoryId} />
        <ProjectCategoryNameTextField defaultValue={nameDefaultValue} />
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
