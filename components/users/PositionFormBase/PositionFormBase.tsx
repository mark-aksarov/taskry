"use client";

import { RACForm } from "@/components/ui";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { FormErrorText } from "@/components/common/FormErrorText";
import { OverlayTriggerStateContext } from "react-aria-components";
import { PositionFormBaseNameTextField } from "./PositionFormBaseNameTextField";
import { startTransition, useActionState, useContext, useEffect } from "react";

const initialState: ActionState = {
  status: null,
  message: null,
};

export interface PositionFormBaseProps {
  id: string;
  positionId?: number;
  nameDefaultValue?: string;
  formAction: ActionFn<ActionState, FormData>;
}

export function PositionFormBase({
  id,
  positionId,
  nameDefaultValue,
  formAction,
}: PositionFormBaseProps) {
  const { close } = useContext(OverlayTriggerStateContext)!;

  const [state, action, pending] = useActionState(formAction, initialState);

  useEffect(() => {
    if (state.status === "success") {
      close();
    }
  }, [state, close]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  return (
    <RACForm id={id} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4">
        {state.status === "error" && (
          <FormErrorText>{state.message}</FormErrorText>
        )}

        {positionId && <input type="hidden" name="id" value={positionId} />}

        <PositionFormBaseNameTextField defaultValue={nameDefaultValue} />
      </div>
    </RACForm>
  );
}
