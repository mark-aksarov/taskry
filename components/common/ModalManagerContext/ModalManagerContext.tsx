"use client";

import {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import { usePathname } from "@/i18n/navigation";

interface ModalManagerContextValue {
  openModalIds: string[];
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
}

const ModalManagerContext = createContext<ModalManagerContextValue | null>(
  null,
);

export function ModalManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openModalIds, setOpenModalIds] = useState<string[]>([]);

  const openModal = useCallback((id: string) => {
    setOpenModalIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const closeModal = useCallback((id: string) => {
    setOpenModalIds((prev) => prev.filter((modalId) => modalId !== id));
  }, []);

  // Reset openModalIds when the page changes
  const pathname = usePathname();
  useEffect(() => {
    setOpenModalIds([]);
  }, [pathname]);

  const value = useMemo<ModalManagerContextValue>(
    () => ({
      openModalIds,
      openModal,
      closeModal,
    }),
    [openModalIds, openModal, closeModal],
  );

  return (
    <ModalManagerContext.Provider value={value}>
      {children}
    </ModalManagerContext.Provider>
  );
}

export function useModalManager() {
  const context = useContext(ModalManagerContext);

  if (!context) {
    throw new Error(
      "useModalManager must be used within a ModalManagerProvider",
    );
  }

  return context;
}
