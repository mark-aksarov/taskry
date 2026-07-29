"use client";

import { auth } from "@/lib/auth";
import { createContext, useContext } from "react";

type SessionContextType = typeof auth.$Infer.Session | null;

const SessionContext = createContext<SessionContextType>(null);

interface SessionProviderProps {
  value: SessionContextType;
  children: React.ReactNode;
}

export function SessionProvider({ value, children }: SessionProviderProps) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used inside SessionProvider");
  }
  return context;
}
