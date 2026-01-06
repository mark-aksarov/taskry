"use client";

import {
  useMemo,
  useTransition,
  createContext,
  TransitionStartFunction,
  useContext,
} from "react";

interface EntityPaginationContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
}

export const EntityPaginationContext =
  createContext<EntityPaginationContextType | null>(null);

export const EntityPaginationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPending, startTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
    }),
    [isPending],
  );

  return (
    <EntityPaginationContext.Provider value={contextValue}>
      {children}
    </EntityPaginationContext.Provider>
  );
};

export function useEntityPagination() {
  const context = useContext(EntityPaginationContext);
  if (context === null) {
    throw new Error(
      "useEntityPagination must be used within a EntityPaginationProvider",
    );
  }
  return context;
}
