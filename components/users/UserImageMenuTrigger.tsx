"use client";

import { useUpdateUserImage } from "./UpdateUserImageContext";
import { PersonImageMenuTrigger } from "../common/PersonImageMenuTrigger";

export function UserImageMenuTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending, onModalOpenChange } = useUpdateUserImage();

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
