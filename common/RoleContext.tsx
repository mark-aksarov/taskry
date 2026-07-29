"use client";

import { createContext, useContext } from "react";

type RoleContextType = "owner" | "member";

const RoleContext = createContext<RoleContextType | null>(null);

interface RoleProviderProps {
  value: RoleContextType;
  children: React.ReactNode;
}

export function RoleProvider({ value, children }: RoleProviderProps) {
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used inside RoleProvider");
  }
  return context;
}
