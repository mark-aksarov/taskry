"use client";

import { useRouter } from "@/i18n/navigation";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { UpdateCustomerBioContext } from "../UpdateCustomerBioContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerBioProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerBioProvider({
  children,
}: UpdateCustomerBioProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCustomer, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomerBio");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomerBio");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerBio");

  return (
    <UpdateCustomerBioContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerBioContext.Provider>
  );
}
