"use client";

import { notFound } from "next/navigation";
import { UpdateUserImageContext } from "./UpdateUserImageContext/UpdateUserImageContext";
import { createPresignedUrl } from "@/lib/actions/s3/createPresignedUrl";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useUpdatePersonImageContextValue } from "@/lib/hooks/useUpdatePersonImageContextValue";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateUserImageProviderProps {
  children: React.ReactNode;
}

export function UpdateUserImageProvider({
  children,
}: UpdateUserImageProviderProps) {
  const contextValue = useUpdatePersonImageContextValue(
    createPresignedUrl,
    updateUserImageUrl,
  );

  const { state, isModalOpen, onModalOpenChange } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  return (
    <UpdateUserImageContext.Provider value={contextValue}>
      {children}
    </UpdateUserImageContext.Provider>
  );
}
