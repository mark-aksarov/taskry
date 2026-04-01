"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateCustomerContext } from "../CreateCustomerContext";
import { createCustomer } from "@/lib/actions/customer/createCustomer";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateCustomerProviderProps {
  children: React.ReactNode;
}

export function CreateCustomerProvider({
  children,
}: CreateCustomerProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createCustomer, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalThenShowToastOnActionSuccess(
    contextValue.state,
    "createCustomer",
  );
  useShowToastWhenModalClosedOnActionSuccess(
    contextValue.state,
    "createCustomer",
  );
  useShowToastWhenModalClosedOnActionError(
    contextValue.state,
    "createCustomer",
  );

  return (
    <CreateCustomerContext.Provider value={contextValue}>
      {children}
    </CreateCustomerContext.Provider>
  );
}
