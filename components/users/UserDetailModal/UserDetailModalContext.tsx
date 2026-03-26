"use client";

import {
  ModalContextType,
  useModalContextValue,
} from "@/components/common/ModalContext";
import { createContext, useContext } from "react";

const UserDetailModalContext = createContext<ModalContextType>(null);

interface UserDetailModalProviderProps {
  children: React.ReactNode;
}

export function UserDetailModalProvider({
  children,
}: UserDetailModalProviderProps) {
  const contextValue = useModalContextValue();

  return (
    <UserDetailModalContext.Provider value={contextValue}>
      {children}
    </UserDetailModalContext.Provider>
  );
}

export function useUserDetailModal() {
  const context = useContext(UserDetailModalContext);
  if (!context) {
    throw new Error(
      "useUserDetailModal must be used within a UserDetailModalProvider",
    );
  }
  return context;
}
