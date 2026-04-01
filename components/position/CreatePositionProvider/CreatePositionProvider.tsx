"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { CreatePositionContext } from "../CreatePositionContext";
import { createPosition } from "@/lib/actions/position/createPosition";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

export const initialState: ActionState = {
  status: null,
};

interface CreatePositionProviderProps {
  children: React.ReactNode;
}

export function CreatePositionProvider({
  children,
}: CreatePositionProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createPosition, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createPosition",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createPosition",
  );
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createPosition",
  );

  return (
    <CreatePositionContext.Provider value={contextValue}>
      {children}
    </CreatePositionContext.Provider>
  );
}
