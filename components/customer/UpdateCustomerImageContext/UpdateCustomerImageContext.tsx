"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export type UpdateCustomerImageActionPayloadType = {
  id: number;
  blob: Blob;
};

export const UpdateCustomerImageContext =
  createContext<ActionContextType<UpdateCustomerImageActionPayloadType> | null>(
    null,
  );

export function useUpdateCustomerImage() {
  const context = useContext(UpdateCustomerImageContext);
  if (!context) {
    throw new Error(
      "useUpdateCustomerImage must be used within a UpdateCustomerImageContext.Provider",
    );
  }
  return context;
}
