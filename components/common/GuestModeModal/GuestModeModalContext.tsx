"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface GuestModeModalContextType {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const GuestModeModalContext =
  createContext<GuestModeModalContextType | null>(null);

interface GuestModeModalProviderProps {
  children: React.ReactNode;
}

export function GuestModeModalProvider({
  children,
}: GuestModeModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const contextValue = useMemo(
    () => ({
      isOpen,
      onOpenChange: setIsOpen,
    }),
    [isOpen],
  );

  return (
    <GuestModeModalContext.Provider value={contextValue}>
      {children}
    </GuestModeModalContext.Provider>
  );
}

export function useGuestModeModal() {
  const context = useContext(GuestModeModalContext);
  if (!context) {
    throw new Error(
      "useGuestModeModal must be used inside GuestModeModalProvider",
    );
  }
  return context;
}
