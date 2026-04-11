"use client";

import { useRouter } from "@/i18n/navigation";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { UpdateCustomerFullNameContext } from "../UpdateCustomerFullNameContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerFullNameProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerFullNameProvider({
  children,
}: UpdateCustomerFullNameProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCustomer, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomerFullName");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomerFullName");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerFullName");

  return (
    <UpdateCustomerFullNameContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerFullNameContext.Provider>
  );
}
