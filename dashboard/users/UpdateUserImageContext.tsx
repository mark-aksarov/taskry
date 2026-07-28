"use client";

import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useUpdateImageActionState } from "@/lib/hooks/useUpdateImageActionState";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export type UpdateUserImageActionPayloadType = {
  id: string;
  blob: Blob;
};

export const UpdateUserImageContext =
  createContext<ActionContextType<UpdateUserImageActionPayloadType> | null>(
    null,
  );

interface UpdateUserImageProviderProps {
  children: React.ReactNode;
}

export function UpdateUserImageProvider({
  children,
}: UpdateUserImageProviderProps) {
  // create presigned url, then upload image to S3, then update user image url in database
  // after success, refresh page to show new image
  const contextValue = useUpdateImageActionState(updateUserImageUrl);

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateUserImage");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateUserImage");

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
      "useUpdateUserImage must be used within a UpdateUserImageContext.Provider",
    );
  }
  return context;
}
