"use client";

import { useRouter } from "@/i18n/navigation";
import { ClearCustomerImageUrlContext } from "../ClearCustomerImageUrlContext";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";

interface ClearCustomerImageUrlProviderProps {
  children: React.ReactNode;
}

export function ClearCustomerImageUrlProvider({
  children,
}: ClearCustomerImageUrlProviderProps) {
  const router = useRouter();
  // when success we need to refresh current route to show that image was deleted
  const contextValue = useActionStateWithCallbacks(
    (customerId: number) =>
      updateCustomerImageUrl({
        id: customerId,
        imageUrl: null,
      }),
    {
      onSuccess: () => router.refresh(),
    },
  );

  const { state } = contextValue;

  useShowToastOnActionError(state);

  return (
    <ClearCustomerImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearCustomerImageUrlContext.Provider>
  );
}
