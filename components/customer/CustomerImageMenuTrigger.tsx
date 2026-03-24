"use client";

import { useUpdateCustomerImage } from "./UpdateCustomerImageContext";
import { useUpdateCustomerImageModal } from "./UpdateCustomerImageModal";
import { useDeleteCustomerImageModal } from "./DeleteCustomerImageModal";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useClearCustomerImageUrl } from "./ClearCustomerImageUrlContext";

export function CustomerImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending: isUpdatePending } = useUpdateCustomerImage();
  const { onOpenChange: onUpdateModalOpenChange } =
    useUpdateCustomerImageModal();

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
