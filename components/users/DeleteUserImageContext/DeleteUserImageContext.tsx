"use client";

import {
  ActionFn,
  ActionState,
  UpdateUserImageUrlPayload,
} from "@/lib/actions/types";

import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { notFound, useParams } from "next/navigation";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { DeletePersonImageContextType } from "@/lib/hooks/useDeletePersonImageContextValue";
import { useDeletePersonImageContextValue } from "@/lib/hooks/useDeletePersonImageContextValue";

const DeleteUserImageContext =
  createContext<DeletePersonImageContextType<string> | null>(null);

interface DeleteUserImageProviderProps {
  updateUserImageUrl: ActionFn<ActionState, UpdateUserImageUrlPayload>;
  children: React.ReactNode;
}

export function DeleteUserImageProvider({
  updateUserImageUrl,
  children,
}: DeleteUserImageProviderProps) {
  const pathname = usePathname();
  const params = useParams();
  const contextValue = useDeletePersonImageContextValue(updateUserImageUrl);

  const { state } = contextValue;

  // wait for transition to finish

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
    <DeleteUserImageContext.Provider value={contextValue}>
      {children}
    </DeleteUserImageContext.Provider>
  );
}

export function useDeleteUserImage() {
  const context = useContext(DeleteUserImageContext);
  if (!context)
    throw new Error(
      "useDeleteUserImage must be used within DeleteUserImageProvider",
    );
  return context;
}
