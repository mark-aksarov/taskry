"use client";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { UpdateCustomerContext } from "../UpdateCustomerContext";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerProvider({
  children,
}: UpdateCustomerProviderProps) {
  const pathname = usePathname();

  const contextValue = useActionStateWithRouteRefresh(updateCustomer);

  const { state } = contextValue;

  // if the customer was not found (e.g. deleted by another user)
  // from the customers page, show error.tsx
  // from the customer detail page, show not-found.tsx
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/customers") {
      throw new Error(state.message, { cause: "customerNotFound" });
    }

    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomer");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomer");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomer");

  return (
    <UpdateCustomerContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerContext.Provider>
  );
}
