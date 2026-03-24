"use client";

import {
  UpdateCustomerImageContext,
  UpdateCustomerImageActionPayloadType,
} from "./UpdateCustomerImageContext";

import { notFound } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useActionState, useMemo } from "react";
import { ActionState } from "@/lib/actions/types";
import { uploadImageToS3 } from "@/lib/utils/uploadImageToS3";
import { useUpdateCustomerImageModal } from "./UpdateCustomerImageModal";
import { updateCustomerImageUrl } from "@/lib/actions/customer/updateCustomerImageUrl";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

const initialState: ActionState = {
  status: null,
};

interface UpdateCustomerImageProviderProps {
  children: React.ReactNode;
}

export function UpdateCustomerImageProvider({
  children,
}: UpdateCustomerImageProviderProps) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (
      _prevState: ActionState,
      { id, blob }: UpdateCustomerImageActionPayloadType,
    ) => {
      // create presigned url, then upload image to S3
      const uploadImageState = await uploadImageToS3(blob);

      if (uploadImageState.status === "error") {
        return {
          status: "error",
          message: uploadImageState.message,
        } as ActionState;
      }

      // update customer image url in database
      const { url, fields } = uploadImageState.presignedPost!;
      const updateImageUrlState = await updateCustomerImageUrl({
        id,
        imageUrl: `${url}/${fields.key}`,
      });

      if (updateImageUrlState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show new image
        router.refresh();
      }

      return updateImageUrlState;
    },
    initialState,
  );

  // Users can update customer image only from customers/[id] page,
  // so call notFound() when errorCode is "notFound"
  if (state.status === "error" && state.errorCode === "notFound") {
    notFound();
  }

  // we need to track UpdateCustomerImageModal open state to show toast
  const { isOpen: isModalOpen, onOpenChange: onModalOpenChange } =
    useUpdateCustomerImageModal();

  // hooks below wait for the transition to complete (reducerAction returns the new state)
  useCloseModalThenShowToastOnActionSuccess(
    state,
    isModalOpen,
    onModalOpenChange,
  );
  useShowToastWhenModalClosedOnActionSuccess(state, isModalOpen);
  useShowToastWhenModalClosedOnActionError(state, isModalOpen);

  const contextValue = useMemo(
    () => ({
      state,
      action,
      isPending,
    }),
    [state, action, isPending],
  );

  return (
    <UpdateCustomerImageContext.Provider value={contextValue}>
      {children}
    </UpdateCustomerImageContext.Provider>
  );
}
