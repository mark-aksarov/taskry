"use client";

import { useRouter } from "@/i18n/navigation";
import { useContext, createContext } from "react";
import { ActionContextType } from "@/lib/actions/types";
import { createProject } from "@/lib/actions/project/createProject";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastOnActionSuccess } from "@/lib/hooks/useShowToastOnActionSuccess";
import { useCloseModalOnActionSuccess } from "@/lib/hooks/useCloseModalOnActionSuccess";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";

const CreateProjectContext = createContext<ActionContextType | null>(null);

interface CreateProjectProviderProps {
  children: React.ReactNode;
}

export function CreateProjectProvider({
  children,
}: CreateProjectProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(createProject, {
    onSuccess: () => router.refresh(),
  });

  useCloseModalOnActionSuccess(contextValue.state, "createProject");
  useShowToastOnActionSuccess(contextValue.state);
  useShowToastWhenModalClosedOnActionError(contextValue.state, "createProject");

  return (
    <CreateProjectContext.Provider value={contextValue}>
      {children}
    </CreateProjectContext.Provider>
  );
}

export function useCreateProject() {
  const context = useContext(CreateProjectContext);
  if (!context)
    throw new Error(
      "useCreateProject must be used within CreateProjectContext.Provider",
    );
  return context;
}
