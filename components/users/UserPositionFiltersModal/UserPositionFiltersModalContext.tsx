"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UserPositionFiltersModalContext = createContext<ModalContextType>(null);

interface UserPositionFiltersModalProviderProps {
  children: React.ReactNode;
}

export function UserPositionFiltersModalProvider({
  children,
}: UserPositionFiltersModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UserPositionFiltersModalContext.Provider value={contextValue}>
      {children}
    </UserPositionFiltersModalContext.Provider>
  );
}

export function useUserPositionFiltersModal() {
  const context = useContext(UserPositionFiltersModalContext);
  if (!context) {
    throw new Error(
      "useUserPositionFiltersModal must be used within a UserPositionFiltersModalProvider",
    );
  }
  return context;
}
