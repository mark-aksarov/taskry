"use client";

import {
  useMemo,
  useTransition,
  createContext,
  TransitionStartFunction,
  useContext,
} from "react";

interface PageTransitionContextType {
  isPaginationPending: boolean;
  isFilteringPending: boolean;
  isSortingPending: boolean;
  startPaginationTransition: TransitionStartFunction;
  startFilteringTransition: TransitionStartFunction;
  startSortingTransition: TransitionStartFunction;
}

export const PageTransitionContext =
  createContext<PageTransitionContextType | null>(null);

export const PageTransitionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPaginationPending, startPaginationTransition] = useTransition();
  const [isFilteringPending, startFilteringTransition] = useTransition();
  const [isSortingPending, startSortingTransition] = useTransition();

  const contextValue = useMemo(
    () => ({
      isPaginationPending,
      isFilteringPending,
      isSortingPending,
      startPaginationTransition,
      startFilteringTransition,
      startSortingTransition,
    }),
    [isPaginationPending, isFilteringPending, isSortingPending],
  );

  return (
    <PageTransitionContext.Provider value={contextValue}>
      {children}
    </PageTransitionContext.Provider>
  );
};

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (context === null) {
    throw new Error(
      "usePageTransition must be used within a PageTransitionProvider",
    );
  }
  return context;
}
