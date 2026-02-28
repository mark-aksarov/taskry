"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CompanyNameTextField } from "./CompanyNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useUpdateCompanyTransition } from "./UpdateCompanyTransitionContext";
import { useUpdateEntityActionState } from "@/lib/hooks/useUpdateEntityActionState";

interface EditCompanyFormProps {
  companyId: number;
  nameDefaultValue: string;
  updateCompany: ActionFn<ActionState, FormData>;
}

export function EditCompanyForm({
  companyId,
  nameDefaultValue,
  updateCompany,
}: EditCompanyFormProps) {
  const t = useTranslations("company.EditCompanyForm");

  const { startTransition } = useUpdateCompanyTransition();

  const [state, action, isPending] = useUpdateEntityActionState({
    updateEntity: updateCompany,
    successMessage: t("successMessage"),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(() => {
      action(formData);
    });
  }

  return (
    <FormBase id="edit-company-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <input type="hidden" name="id" value={companyId} />
        <CompanyNameTextField defaultValue={nameDefaultValue} />
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
