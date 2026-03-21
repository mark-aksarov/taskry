"use client";

import {
  ActionFn,
  ActionState,
  UpdateCustomerImageUrlPayload,
} from "@/lib/actions/types";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { DeletePersonImageContextType } from "@/lib/hooks/useDeletePersonImageContextValue";
import { useDeletePersonImageContextValue } from "@/lib/hooks/useDeletePersonImageContextValue";

const DeleteCustomerImageContext =
  createContext<DeletePersonImageContextType<number> | null>(null);

interface DeleteCustomerImageProviderProps {
  updateCustomerImageUrl: ActionFn<ActionState, UpdateCustomerImageUrlPayload>;
  children: React.ReactNode;
}

export function DeleteCustomerImageProvider({
  updateCustomerImageUrl,
  children,
}: DeleteCustomerImageProviderProps) {
  const pathname = usePathname();
  const contextValue = useDeletePersonImageContextValue(updateCustomerImageUrl);

  const { state } = contextValue;

  // wait for transition to finish

  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/customers") {
      throw new Error(state.message, { cause: "customerNotFound" });
    }

    notFound();
  }

  useShowToastOnActionError(state);

  return (
    <DeleteCustomerImageContext.Provider value={contextValue}>
      {children}
    </DeleteCustomerImageContext.Provider>
  );
}

export function useDeleteCustomerImage() {
  const context = useContext(DeleteCustomerImageContext);
  if (!context)
    throw new Error(
      "useDeleteCustomerImage must be used within DeleteCustomerImageProvider",
    );
  return context;
}
