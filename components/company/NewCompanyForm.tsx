"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { startTransition, useRef } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { CompanyNameTextField } from "./CompanyNameTextField";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useCreateEntityActionState } from "@/lib/hooks/useCreateEntityActionState";

interface NewCompanyFormProps {
  createCompany: ActionFn<ActionState, FormData>;
}

export function NewCompanyForm({ createCompany }: NewCompanyFormProps) {
  const t = useTranslations("company.NewCompanyForm");

  // The ref is used inside reducerAction
  // ref.current is null on unmount, preventing programmatic modal close when opening another form in the same modal
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useCreateEntityActionState({
    createEntity: createCompany,
    formRef: ref,
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
    <FormBase ref={ref} id="new-company-form" onSubmit={handleSubmit}>
      <FormBaseBody>
        <CompanyNameTextField />
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
