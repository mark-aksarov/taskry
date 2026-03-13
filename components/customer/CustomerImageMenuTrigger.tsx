"use client";

import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";
import { useUpdateCustomerImage } from "./UpdateCustomerImageContext";

export function CustomerImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending, onModalOpenChange } = useUpdateCustomerImage();

  return (
    <PersonImageMenuTrigger
      onDelete={() => {}}
      onUpdate={() => onModalOpenChange(true)}
      isDisabled={isPending}
    >
      {children}
    </PersonImageMenuTrigger>
  );
}
