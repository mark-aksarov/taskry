"use client";

import { useRouter } from "@/i18n/navigation";
import { CreateCustomerContext } from "../CreateCustomerContext";
import { createCustomer } from "@/lib/actions/customer/createCustomer";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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

  useCloseModalOnActionSuccess(contextValue.state, "createCustomer");
  useShowToastOnActionSuccess(contextValue.state);
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
