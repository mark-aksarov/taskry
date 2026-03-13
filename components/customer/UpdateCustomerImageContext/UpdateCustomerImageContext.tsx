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
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastOnActionErrorWhenModalClosed } from "@/lib/hooks/useShowToastOnActionErrorWhenModalClosed";

const UpdateCustomerImageContext =
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

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

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
