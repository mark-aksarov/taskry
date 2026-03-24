"use client";

import { notFound } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { ClearCustomerImageUrlContext } from "../ClearCustomerImageUrlContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";

export const initialState: ActionState = {
  status: null,
};

interface ClearCustomerImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearCustomerImageUrlProvider({
  children,
}: ClearCustomerImageUrlProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (_prevState: ActionState, customerId: number) => {
      // to clear imageUrl, we use updateCustomerImageUrl server action, which sets it to null
      const newState = await updateCustomerImageUrl({
        id: customerId,
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

  // Customers can delete their image only from their profile page,
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
    <ClearCustomerImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearCustomerImageUrlContext.Provider>
  );
}
