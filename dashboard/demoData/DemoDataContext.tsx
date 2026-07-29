"use client";

import { useRouter } from "@/i18n/navigation";
import { ActionState } from "@/lib/actions/types";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { seedDemoData } from "@/lib/actions/demoData/seedDemoData";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

export const DemoDataContext =
  createContext<ActionContextType<undefined> | null>(null);

export const initialState: ActionState = {
  status: null,
};

interface DemoDataProviderProps {
  children: React.ReactNode;
}

export function DemoDataProvider({ children }: DemoDataProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks<undefined>(seedDemoData, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "demoData");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "demoData");

  return (
    <DemoDataContext.Provider value={contextValue}>
      {children}
    </DemoDataContext.Provider>
  );
}

export function useDemoData() {
  const context = useContext(DemoDataContext);
  if (!context)
    throw new Error("useDemoData must be used within DemoDataContext.Provider");
  return context;
}
