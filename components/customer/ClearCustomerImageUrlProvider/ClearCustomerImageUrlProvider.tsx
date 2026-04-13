"use client";

import { useRouter } from "@/i18n/navigation";
import { ClearCustomerImageUrlContext } from "../ClearCustomerImageUrlContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useRefreshCustomerDetail } from "@/lib/swr/hooks/useRefreshCustomerDetail";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";

interface ClearCustomerImageUrlProviderProps {
  customerId: number;
  children: React.ReactNode;
}

export function ClearCustomerImageUrlProvider({
  customerId,
  children,
}: ClearCustomerImageUrlProviderProps) {
  // When updating the image from CustomerDetailModal, we need to revalidate (refresh) customer details via SWR
  const refreshCustomerDetail = useRefreshCustomerDetail();

  const router = useRouter();
  // when success we need to refresh current route to show that image was deleted
  const contextValue = useActionStateWithCallbacks(
    (customerId: number) =>
      updateCustomerImageUrl({
        id: customerId,
        imageUrl: null,
      }),
    {
      onSuccess: async () => {
        await refreshCustomerDetail(customerId);
        router.refresh();
      },
    },
  );

  const { state } = contextValue;

  useShowToastOnActionSuccess(state);
  useShowToastOnActionError(state);

  return (
    <ClearCustomerImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearCustomerImageUrlContext.Provider>
  );
}
