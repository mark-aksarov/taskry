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
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

export function useUpdateUserImage() {
  const context = useContext(UpdateUserImageContext);
  if (!context) {
    throw new Error(
      "useUpdateUserImage must be used within a UpdateUserImageProvider",
    );
  }
  return context;
}
