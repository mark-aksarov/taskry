"use client";

import { useModal } from "../common/ModalManagerContext";
import { useUpdateCustomerImage } from "./UpdateCustomerImageContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useClearCustomerImageUrl } from "./ClearCustomerImageUrlContext";

export function CustomerImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
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
      onDelete={() => onDeleteModalOpenChange(true)}
      onUpdate={() => onUpdateModalOpenChange(true)}
      isDisabled={isUpdatePending || isDeletePending}
    >
      {children}
    </PersonImageMenuTrigger>
  );
}
