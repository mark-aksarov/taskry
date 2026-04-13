"use client";

import { useRouter } from "@/i18n/navigation";
import { ClearUserImageUrlContext } from "../ClearUserImageUrlContext";
import { updateUserImageUrl } from "@/lib/actions/user/updateUserImageUrl";
import { useRefreshUserDetail } from "@/lib/swr/hooks/useRefreshUserDetail";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";

interface ClearUserImageUrlProviderProps {
  userId: string;
  children: React.ReactNode;
}

export function ClearUserImageUrlProvider({
  userId,
  children,
}: ClearUserImageUrlProviderProps) {
  // When updating the image from UserDetailModal, we need to revalidate (refresh) user details via SWR
  const refreshUserDetail = useRefreshUserDetail();

  const router = useRouter();
  // when success we need to refresh current route to show that image was deleted
  const contextValue = useActionStateWithCallbacks(
    (userId: string) =>
      updateUserImageUrl({
        id: userId,
        imageUrl: null,
      }),
    {
      onSuccess: async () => {
        await refreshUserDetail(userId);
        router.refresh();
      },
    },
  );

  const { state } = contextValue;

  useShowToastOnActionSuccess(state);
  useShowToastOnActionError(state);

  return (
    <ClearUserImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearUserImageUrlContext.Provider>
  );
}
