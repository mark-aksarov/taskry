"use client";

import { UpdateUserImageContext } from "../UpdateUserImageContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useUpdateImageActionState } from "@/lib/hooks/useUpdateImageActionState";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

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
