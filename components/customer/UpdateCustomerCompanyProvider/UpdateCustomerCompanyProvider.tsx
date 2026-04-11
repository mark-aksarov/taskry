"use client";

import { useRouter } from "@/i18n/navigation";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { UpdateCustomerCompanyContext } from "../UpdateCustomerCompanyContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerCompanyProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerCompanyProvider({
  children,
}: UpdateCustomerCompanyProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateCustomer, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomerCompany");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomerCompany");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerCompany");

  return (
    <UpdateCustomerCompanyContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerCompanyContext.Provider>
  );
}
