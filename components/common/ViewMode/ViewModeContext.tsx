"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useRef,
  RefObject,
} from "react";

export type ViewMode = "list" | "grid";

interface ViewModeContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

const ViewModeContext = createContext<ViewModeContextType | null>(null);

export function ViewModeProvider({
  initialValue = "list",
  children,
}: {
  initialValue?: ViewMode;
  children: React.ReactNode;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>(initialValue);

  const containerRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({
      viewMode,
      setViewMode,
      containerRef,
    }),
    [viewMode],
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
