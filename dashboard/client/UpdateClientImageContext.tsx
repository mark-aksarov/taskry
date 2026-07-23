"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export type UpdateClientImageActionPayloadType = {
  id: number;
  blob: Blob;
};

export const UpdateClientImageContext =
  createContext<ActionContextType<UpdateClientImageActionPayloadType> | null>(
    null,
  );

export function useUpdateClientImage() {
  const context = useContext(UpdateClientImageContext);
  if (!context) {
    throw new Error(
      "useUpdateClientImage must be used within a UpdateClientImageContext.Provider",
    );
  }
  return context;
}
