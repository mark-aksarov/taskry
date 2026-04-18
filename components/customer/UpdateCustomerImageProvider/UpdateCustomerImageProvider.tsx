"use client";

import { UpdateCustomerImageContext } from "../UpdateCustomerImageContext";
import { useUpdateImageActionState } from "@/lib/hooks/useUpdateImageActionState";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

interface UpdateCustomerImageProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerImageProvider({
  children,
}: UpdateCustomerImageProviderProps) {
  // create presigned url, then upload image to S3, then update customer image url in database
  // after success, refresh page to show new image
  const contextValue = useUpdateImageActionState(updateCustomerImageUrl);

  const { state } = contextValue;

  useCloseModalOnActionSuccess(contextValue.state, "updateCustomerImage");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerImage");

  return (
    <UpdateCustomerImageContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerImageContext.Provider>
  );
}
