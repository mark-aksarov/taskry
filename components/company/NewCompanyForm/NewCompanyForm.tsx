"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { CompanyNameTextField } from "../CompanyNameTextField";

const initialState: ActionState = {
  status: null,
};

interface NewCompanyFormProps {
  createCompany: ActionFn<ActionState, FormData>;
}

export function NewCompanyForm({ createCompany }: NewCompanyFormProps) {
  const t = useTranslations("company.NewCompanyForm");

  const [state, action, pending] = useActionState(createCompany, initialState);

  return (
    <FormBase id="new-company-form" state={state} action={action}>
      <CompanyNameTextField />
      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
