"use client";

import { UpdateUserImageContext } from "../UpdateUserImageContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useRefreshUserDetail } from "@/lib/swr/hooks/useRefreshUserDetail";
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
  // When updating the image from UserDetailModal, we need to revalidate (refresh) user details via SWR
  const refreshUserDetail = useRefreshUserDetail();

  // create presigned url, then upload image to S3, then update user image url in database
  // after success, refresh page to show new image
  const contextValue = useUpdateImageActionState(
    updateUserImageUrl,
    refreshUserDetail,
  );

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateUserImage");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateUserImage");
  useShowToastWhenModalClosedOnActionError(state, "updateUserImage");

  return (
    <UpdateUserImageContext.Provider value={contextValue}>
      {children}
    </UpdateUserImageContext.Provider>
  );
}
