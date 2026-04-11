"use client";

import { useRouter } from "@/i18n/navigation";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { UpdateCustomerPublicLinkContext } from "../UpdateCustomerPublicLinkContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerPublicLinkProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerPublicLinkProvider({
  children,
}: UpdateCustomerPublicLinkProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCustomer, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomerPublicLink");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomerPublicLink");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerPublicLink");

  return (
    <UpdateCustomerPublicLinkContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerPublicLinkContext.Provider>
  );
}
