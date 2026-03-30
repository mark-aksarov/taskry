"use client";

import { notFound } from "next/navigation";
import { UpdateUserImageContext } from "../UpdateUserImageContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useUpdateImageActionState } from "@/lib/hooks/useUpdateImageActionState";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  // users can update user image only from users/[id] page,
  // so call notFound() when errorCode is "notFound"
  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserImage");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserImage");
  useShowToastWhenModalClosedOnActionError(state, "updateUserImage");

  return (
    <UpdateUserImageContext.Provider value={contextValue}>
      {children}
    </UpdateUserImageContext.Provider>
  );
}
