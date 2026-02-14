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
import { CompanyNameTextField } from "../CompanyNameTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

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

  const [state, action, isPending] = useActionState(
    updateCompany,
    initialState,
  );

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="edit-company-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
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
