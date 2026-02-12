"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { ProjectCategoryNameTextField } from "../ProjectCategoryNameTextField";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

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

  const [state, action, isPending] = useActionState(
    updateProjectCategory,
    initialState,
  );

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="edit-project-category-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <input type="hidden" name="id" value={projectCategoryId} />
        <ProjectCategoryNameTextField defaultValue={nameDefaultValue} />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {t("updateError")}
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
