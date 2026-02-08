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
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { CompanyNameTextField } from "../CompanyNameTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface NewCompanyFormProps {
  createCompany: ActionFn<ActionState, FormData>;
}

export function NewCompanyForm({ createCompany }: NewCompanyFormProps) {
  const t = useTranslations("company.NewCompanyForm");

  const [state, action, pending] = useActionState(createCompany, initialState);

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="new-company-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <CompanyNameTextField />
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
