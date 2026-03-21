"use client";

import { useDeleteCustomerImage } from "./DeleteCustomerImageContext";
import { useUpdateCustomerImage } from "./UpdateCustomerImageContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";

export function CustomerImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    isPending: isUpdatePending,
    onModalOpenChange: onUpdateModalOpenChange,
  } = useUpdateCustomerImage();

  const {
    isPending: isDeletePending,
    onModalOpenChange: onDeleteModalOpenChange,
  } = useDeleteCustomerImage();

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
