"use client";

import { notFound, useParams } from "next/navigation";
import { UpdateUserContext } from "../UpdateUserContext";
import { usePathname, useRouter } from "@/i18n/navigation";
import { updateUser } from "@/lib/actions/user/updateUser";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateUserProviderProps {
  children: React.ReactNode;
}

export function UpdateUserProvider({ children }: UpdateUserProviderProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateUser, {
    onSuccess: () => router.refresh(),
  });

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

  useCloseModalThenShowToastOnActionSuccess(state, "updateUser");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUser");
  useShowToastWhenModalClosedOnActionError(state, "updateUser");

  return (
    <UpdateUserContext.Provider value={contextValue}>
      {children}
    </UpdateUserContext.Provider>
  );
}
