"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface PageTabsContextType {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const PageTabsContext = createContext<PageTabsContextType | null>(null);

export function PageTabsProvider({
  initialSelectedTab = "list",
  children,
}: {
  initialSelectedTab?: string;
  children: React.ReactNode;
}) {
  const [selectedTab, setSelectedTab] = useState<string>(initialSelectedTab);

  const contextValue = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
    }),
    [selectedTab, setSelectedTab],
  );

  return (
    <PageTabsContext.Provider value={contextValue}>
      {children}
    </PageTabsContext.Provider>
  );
}

export function usePageTabs() {
  const context = useContext(PageTabsContext);
  if (!context) {
    throw new Error("usePageTabs must be used within a PageTabsProvider");
  }
  return context;
}
