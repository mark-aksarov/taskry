"use client";

import { notFound } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { ClearUserImageUrlContext } from "./ClearUserImageUrlContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";

export const initialState: ActionState = {
  status: null,
};

interface ClearUserImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearUserImageUrlProvider({
  children,
}: ClearUserImageUrlProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, userId: string) => {
      // to clear imageUrl, we use updateUserImageUrl server action, which sets it to null
      const newState = await updateUserImageUrl({
        id: userId,
        imageUrl: null,
      });

      if (newState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // we need refresh profile page to show new image
        router.refresh();
      }

      return newState;
    },
    initialState,
  );

  // wait for the transition (reducerAction returning new state) to finish

  // Users can delete their image only from their profile page,
  // so call notFound() when errorCode is "notFound"
  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  // If errorCode is not "notFound", show a toast
  useShowToastOnActionError(state);

  const contextValue = useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );

  return (
    <ClearUserImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearUserImageUrlContext.Provider>
  );
}
