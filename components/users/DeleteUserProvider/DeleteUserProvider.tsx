"use client";

import { usePathname } from "@/i18n/navigation";
import { notFound, useParams } from "next/navigation";
import { DeleteUserContext } from "../DeleteUserContext";
import { deleteUser } from "@/lib/actions/user/deleteUser";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface DeleteUserProviderProps {
  children: React.ReactNode;
}

export function DeleteUserProvider({ children }: DeleteUserProviderProps) {
  const pathname = usePathname();
  const params = useParams();

  const contextValue = useActionStateWithRouteRefresh(deleteUser);

  const { state } = contextValue;

  if (state.status === "error" && state.errorCode === "notFound") {
    if (
      (pathname.startsWith("/team") && params.id) ||
      pathname.startsWith("/profile")
    ) {
      notFound();
    }
    throw new Error(state.message, { cause: "userNotFound" });
  }

  useShowToastOnActionError(state);

  return (
    <DeleteUserContext.Provider value={contextValue}>
      {children}
    </DeleteUserContext.Provider>
  );
}
