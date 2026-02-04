"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { FormBase } from "@/components/common/FormBase";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { ErrorBanner } from "@/components/common/ErrorBanner";
import { PositionNameTextField } from "../PositionNameTextField";

const initialState: ActionState = {
  status: null,
};

interface NewPositionFormProps {
  createPosition: ActionFn<ActionState, FormData>;
}

export function NewPositionForm({ createPosition }: NewPositionFormProps) {
  const t = useTranslations("positions.NewPositionForm");

  const [state, action, pending] = useActionState(createPosition, initialState);

  return (
    <FormBase id="new-position-form" state={state} action={action}>
      <PositionNameTextField />
      {state.status === "error" && (
        <ErrorBanner>{t("error.creationError")}</ErrorBanner>
      )}
    </FormBase>
  );
}
