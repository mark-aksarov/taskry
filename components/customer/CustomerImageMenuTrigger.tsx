"use client";

import { useUpdateCustomerImage } from "./UpdateCustomerImageContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useClearCustomerImageUrl } from "./ClearCustomerImageUrlContext";
import { useDeleteCustomerImageModal } from "./DeleteCustomerImageModal/DeleteCustomerImageModalContext";

export function CustomerImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isPending: isUpdatePending,
    onModalOpenChange: onUpdateModalOpenChange,
  } = useUpdateCustomerImage();

  const { isPending: isDeletePending } = useClearCustomerImageUrl();
  const { onOpenChange: onDeleteModalOpenChange } =
    useDeleteCustomerImageModal();

  return (
    <PersonImageMenuTrigger
      onDelete={() => onDeleteModalOpenChange(true)}
      onUpdate={() => onUpdateModalOpenChange(true)}
      isDisabled={isUpdatePending || isDeletePending}
    >
      {children}
    </PersonImageMenuTrigger>
  );
}
