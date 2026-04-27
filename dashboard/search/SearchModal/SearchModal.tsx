"use client";

import { useModal } from "@/common/ModalManagerContext";
import { ResponsiveModal } from "@/dashboard/common/ResponsiveModal";

interface SearchModalProps {
  children: React.ReactNode;
  "data-test"?: string;
}

export function SearchModal({
  children,
  "data-test": dataTest,
}: SearchModalProps) {
  const { isOpen, onOpenChange } = useModal("search");

  return (
    <ResponsiveModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      data-test={dataTest}
      isDismissable
      className="md:w-[600px]"
    >
      {children}
    </ResponsiveModal>
  );
}
