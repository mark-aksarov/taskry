"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";

export type UpdateUserImageActionPayloadType = {
  id: string;
  blob: Blob;
};

export const UpdateUserImageContext =
  createContext<ActionContextType<UpdateUserImageActionPayloadType> | null>(
    null,
  );

export function useUpdateUserImage() {
  const context = useContext(UpdateUserImageContext);
  if (!context) {
    throw new Error(
      "useUpdateUserImage must be used within a UpdateUserImageContext.Provider",
    );
  }
  return context;
}
