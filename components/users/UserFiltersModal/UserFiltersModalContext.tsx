"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UserFiltersModalContext = createContext<ModalContextType>(null);

interface UserFiltersModalProviderProps {
  children: React.ReactNode;
}

export function UserFiltersModalProvider({
  children,
}: UserFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UserFiltersModalContext.Provider value={contextValue}>
      {children}
    </UserFiltersModalContext.Provider>
  );
}

export function useUserFiltersModal() {
  const context = useContext(UserFiltersModalContext);
  if (!context) {
    throw new Error(
      "useUserFiltersModal must be used within a UserFiltersModalProvider",
    );
  }
  return context;
}
