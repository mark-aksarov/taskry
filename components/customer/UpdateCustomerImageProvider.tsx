"use client";

import { notFound } from "next/navigation";
import { createPresignedUrl } from "@/lib/actions/s3/createPresignedUrl";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";
import { useUpdatePersonImageContextValue } from "@/lib/hooks/useUpdatePersonImageContextValue";
import { UpdateCustomerImageContext } from "./UpdateCustomerImageContext/UpdateCustomerImageContext";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateCustomerImageProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerImageProvider({
  children,
}: UpdateCustomerImageProviderProps) {
  const contextValue = useUpdatePersonImageContextValue(
    createPresignedUrl,
    updateCustomerImageUrl,
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
    <UpdateCustomerImageContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerImageContext.Provider>
  );
}
