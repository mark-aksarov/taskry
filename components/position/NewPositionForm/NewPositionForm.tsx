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
import { PositionNameTextField } from "../PositionNameTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface NewPositionFormProps {
  createPosition: ActionFn<ActionState, FormData>;
}

export function NewPositionForm({ createPosition }: NewPositionFormProps) {
  const t = useTranslations("positions.NewPositionForm");

  const [state, action, pending] = useActionState(createPosition, initialState);

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="new-position-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <PositionNameTextField />
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
