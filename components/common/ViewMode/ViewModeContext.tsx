"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useTransition,
} from "react";

export type ViewMode = "list" | "grid";

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeContext = createContext<ViewModeContextType | null>(null);

export function ViewModeProvider({
  initialValue = "list",
  children,
}: {
  initialValue?: ViewMode;
  children: React.ReactNode;
}) {
  const [viewMode, setViewModeState] = useState<ViewMode>(initialValue);
  const [isPending, startTransition] = useTransition();

  const setViewMode = (mode: ViewMode) => {
    startTransition(() => {
      setViewModeState(mode);
    });
  };

  const contextValue = useMemo(
    () => ({
      viewMode,
      setViewMode,
      isPending,
    }),
    [viewMode, isPending],
  );

  return (
    <ViewModeContext.Provider value={contextValue}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return context;
}
