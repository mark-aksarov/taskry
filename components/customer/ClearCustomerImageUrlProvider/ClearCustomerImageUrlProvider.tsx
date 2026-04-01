"use client";

import { notFound } from "next/navigation";
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

  // users can delete customer image only from customers/[id] page,
  // so call notFound() when errorCode is "notFound"
  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  useShowToastOnActionError(state);

  return (
    <ClearCustomerImageUrlContext.Provider value={contextValue}>
      {children}
    </ClearCustomerImageUrlContext.Provider>
  );
}
