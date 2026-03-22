"use client";

import {
  ActionFn,
  ActionState,
  CreatePresignedUrlState,
  UpdateCustomerImageUrlPayload,
} from "@/lib/actions/types";

import {
  UpdatePersonImageContextType,
  useUpdatePersonImageContextValue,
} from "@/lib/hooks/useUpdatePersonImageContextValue";

import { notFound } from "next/navigation";
import { useContext, createContext } from "react";
import { overlayTransitionDuration } from "@/components/ui/styles";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

export const UpdateCustomerImageContext =
  createContext<UpdatePersonImageContextType<number> | null>(null);

interface UpdateCustomerImageProviderProps {
  createPresignedUrl: ActionFn<CreatePresignedUrlState, void>;
  updateCustomerImageUrl: ActionFn<ActionState, UpdateCustomerImageUrlPayload>;
  children: React.ReactNode;
}

export function UpdateCustomerImageProvider({
  createPresignedUrl,
  updateCustomerImageUrl,
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

export function useUpdateCustomerImage() {
  const context = useContext(UpdateCustomerImageContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerImage must be used within a UpdateCustomerImageProvider",
    );
  }
  return context;
}
