import { useMemo, useState } from "react";

export type ModalContextType = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
} | null;

export function useModalContextValue() {
  const [isOpen, setIsOpen] = useState(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      onOpenChange: setIsOpen,
    }),
    [isOpen],
  );

  return contextValue;
}
