"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { useUpdateImageActionState } from "@/lib/hooks/useUpdateImageActionState";
import { updateClientImageUrl } from "@/lib/actions/client/updateClientImageUrl";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export type UpdateClientImageActionPayloadType = {
  id: number;
  blob: Blob;
};

export const UpdateClientImageContext =
  createContext<ActionContextType<UpdateClientImageActionPayloadType> | null>(
    null,
  );

interface UpdateClientImageProviderProps {
  children: React.ReactNode;
}

export function UpdateClientImageProvider({
  children,
}: UpdateClientImageProviderProps) {
  // create presigned url, then upload image to S3, then update client image url in database
  // after success, refresh page to show new image
  const contextValue = useUpdateImageActionState(updateClientImageUrl);

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateClientImage");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateClientImage");

  return (
    <UpdateClientImageContext.Provider value={contextValue}>
      {children}
    </UpdateClientImageContext.Provider>
  );
}

export function useUpdateClientImage() {
  const context = useContext(UpdateClientImageContext);
  if (!context) {
    throw new Error(
      "useUpdateClientImage must be used within a UpdateClientImageContext.Provider",
    );
  }
  return context;
}
