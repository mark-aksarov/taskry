"use client";

import { useSearchModal } from "./SearchModalContext";
import { ResponsiveModal } from "@/components/common/ResponsiveModal";

interface SearchModalProps {
  children: React.ReactNode;
  "data-test"?: string;
}

export function SearchModal({
  children,
  "data-test": dataTest,
}: SearchModalProps) {
  const { isOpen, onOpenChange } = useSearchModal();

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
