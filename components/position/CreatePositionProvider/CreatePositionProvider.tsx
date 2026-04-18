"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { CreatePositionContext } from "../CreatePositionContext";
import { createPosition } from "@/lib/actions/position/createPosition";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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

  useCloseModalOnActionSuccess(contextValue.state, "createPosition");
  useShowToastOnActionSuccess(contextValue.state);
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
