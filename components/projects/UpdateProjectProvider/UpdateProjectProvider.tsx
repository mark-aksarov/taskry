"use client";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { UpdateProjectContext } from "../UpdateProjectContext";
import { updateCustomer } from "@/lib/actions/customer/updateCustomer";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateProjectProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectProvider({
  children,
}: UpdateProjectProviderProps) {
  const pathname = usePathname();
  const contextValue = useActionStateWithRouteRefresh(updateCustomer);
  const { state } = contextValue;

  // if the project was not found (e.g. deleted by another user)
  // from the projects page, show error.tsx
  // from the project detail page, show not-found.tsx
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/projects") {
      throw new Error(state.message, { cause: "projectNotFound" });
    }

    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateProject");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProject");
  useShowToastWhenModalClosedOnActionError(state, "updateProject");

  return (
    <UpdateProjectContext.Provider value={contextValue}>
      {children}
    </UpdateProjectContext.Provider>
  );
}
