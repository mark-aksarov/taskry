"use client";

import { CreateCustomerContext } from "../CreateCustomerContext";
import { createCustomer } from "@/lib/actions/customer/createCustomer";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface CreateCustomerProviderProps {
  children: React.ReactNode;
}

export function CreateCustomerProvider({
  children,
}: CreateCustomerProviderProps) {
  const contextValue = useActionStateWithRouteRefresh(createCustomer);

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
