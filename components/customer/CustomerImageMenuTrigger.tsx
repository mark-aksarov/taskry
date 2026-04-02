"use client";

import { useModal } from "../common/ModalManagerContext";
import { useUpdateCustomerImage } from "./UpdateCustomerImageContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useClearCustomerImageUrl } from "./ClearCustomerImageUrlContext";

interface CustomerImageMenuTriggerProps {
  showDeleteMenuItem: boolean;
  children: React.ReactNode;
}

export function CustomerImageMenuTrigger({
  showDeleteMenuItem,
  children,
}: CustomerImageMenuTriggerProps) {
  const { isPending: isUpdatePending } = useUpdateCustomerImage();
  const { onOpenChange: onUpdateModalOpenChange } = useModal(
    "updateCustomerImage",
  );

  const { isPending: isDeletePending } = useClearCustomerImageUrl();
  const { onOpenChange: onDeleteModalOpenChange } = useModal(
    "deleteCustomerImage",
  );

  return (
    <PersonImageMenuTrigger
      showDeleteMenuItem={showDeleteMenuItem}
      onDelete={() => onDeleteModalOpenChange(true)}
      onUpdate={() => onUpdateModalOpenChange(true)}
      isDisabled={isUpdatePending || isDeletePending}
    >
      {children}
    </PersonImageMenuTrigger>
  );
}
