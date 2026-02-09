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
import { PositionNameTextField } from "../PositionNameTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";
import { useCloseOverlayOnActionSuccess } from "@/lib/hooks/useCloseOverlayOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface NewPositionFormProps {
  createPosition: ActionFn<ActionState, FormData>;
}

export function NewPositionForm({ createPosition }: NewPositionFormProps) {
  const t = useTranslations("positions.NewPositionForm");

  const [state, action, isPending] = useActionState(
    createPosition,
    initialState,
  );

  useCloseOverlayOnActionSuccess(state);

  return (
    <FormBase
      id="new-position-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <PositionNameTextField />
        <FormErrorBanner status={state.status} isPending={isPending}>
          {t("error.creationError")}
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
