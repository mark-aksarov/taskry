"use client";

import { createContext, useContext } from "react";

interface CurrentUserContextType {
  isGuest: boolean;
  isOwner: boolean;
  isEmailVerified: boolean;
  userId: string | null;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null,
);

interface CurrentUserProviderProps {
  value: CurrentUserContextType;
  children: React.ReactNode;
}

export function CurrentUserProvider({
  value,
  children,
}: CurrentUserProviderProps) {
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export function useCurrentUser() {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useCurrentUser must be used inside CurrentUserProvider");
  }
  return context;
}
