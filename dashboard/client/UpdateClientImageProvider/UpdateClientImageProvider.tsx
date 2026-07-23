"use client";

import { UpdateClientImageContext } from "../UpdateClientImageContext";
import { useUpdateImageActionState } from "@/lib/hooks/useUpdateImageActionState";
import { updateClientImageUrl } from "@/lib/actions/client/updateClientImageUrl";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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
