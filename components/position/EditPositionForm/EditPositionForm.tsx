"use client";

import {
  FormBase,
  FormBaseBody,
  FormBaseFooter,
  FormBaseSubmitButton,
  useFormBaseActionState,
} from "@/components/common/FormBase";

import { useTranslations } from "next-intl";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { PositionNameTextField } from "../PositionNameTextField";
import { handleActionSubmit } from "@/lib/utils/handleActionSubmit";
import { FormErrorBanner } from "@/components/common/FormErrorBanner";

interface EditPositionFormProps {
  positionId: number;
  nameDefaultValue: string;
  updatePosition: ActionFn<ActionState, FormData>;
}

export function EditPositionForm({
  positionId,
  nameDefaultValue,
  updatePosition,
}: EditPositionFormProps) {
  const t = useTranslations("positions.EditPositionForm");

  const [state, action, isPending] = useFormBaseActionState(updatePosition);

  return (
    <FormBase
      id="edit-position-form"
      onSubmit={(e) => handleActionSubmit(e, action)}
    >
      <FormBaseBody>
        <input type="hidden" name="id" value={positionId} />
        <PositionNameTextField defaultValue={nameDefaultValue} />
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
