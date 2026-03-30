"use client";

import { notFound } from "next/navigation";
import { UpdateCustomerImageContext } from "../UpdateCustomerImageContext";
import { useUpdateImageActionState } from "@/lib/hooks/useUpdateImageActionState";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

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

  // users can update customer image only from customers/[id] page,
  // so call notFound() when errorCode is "notFound"
  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  useCloseModalThenShowToastOnActionSuccess(state, "updateCustomerImage");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateCustomerImage");
  useShowToastWhenModalClosedOnActionError(state, "updateCustomerImage");

  return (
    <UpdateCustomerImageContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerImageContext.Provider>
  );
}
