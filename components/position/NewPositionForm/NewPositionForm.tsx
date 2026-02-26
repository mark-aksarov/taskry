"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { PositionNameTextField } from "../PositionNameTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface NewPositionFormProps {
  createPosition: ActionFn<ActionState, FormData>;
}

export function NewPositionForm({ createPosition }: NewPositionFormProps) {
  const t = useTranslations("positions.NewPositionForm");

  // The ref is used inside reducerAction in useFormBaseActionState.
  // ref.current in useFormBaseActionState is null on unmount, preventing programmatic modal close when opening another form.
  const ref = useRef<HTMLFormElement>(null);

  const [state, action, isPending] = useFormBaseActionState(
    createPosition,
    ref,
    t("successMessage"),
  );

  return (
    <FormBase
      ref={ref}
      id="new-position-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <PositionNameTextField />
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
