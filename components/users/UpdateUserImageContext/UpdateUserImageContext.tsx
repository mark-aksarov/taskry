"use client";

import {
  ActionFn,
  ActionState,
  CreatePresignedUrlState,
  UpdateUserImageUrlPayload,
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

export const UpdateUserImageContext =
  createContext<UpdatePersonImageContextType<string> | null>(null);

interface UpdateUserImageProviderProps {
  createPresignedUrl: ActionFn<CreatePresignedUrlState, void>;
  updateUserImageUrl: ActionFn<ActionState, UpdateUserImageUrlPayload>;
  children: React.ReactNode;
}

export function UpdateUserImageProvider({
  createPresignedUrl,
  updateUserImageUrl,
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

  useShowToastOnActionSuccess(state);
  useCloseModalOnActionSuccess(state, onModalOpenChange);
  useShowToastOnActionErrorWhenModalClosed(state, isModalOpen);

  return (
    <UpdateUserImageContext.Provider value={contextValue}>
      {children}
    </UpdateUserImageContext.Provider>
  );
}

export function useUpdateUserImage() {
  const context = useContext(UpdateUserImageContext);
  if (!context) {
    throw new Error(
      "useUpdateUserImage must be used within a UpdateUserImageProvider",
    );
  }
  return context;
}
