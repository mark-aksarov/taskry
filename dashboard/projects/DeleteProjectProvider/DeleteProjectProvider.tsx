"use client";

import { useRouter } from "@/i18n/navigation";
import { DeleteProjectContext } from "../DeleteProjectContext";
import { deleteProject } from "@/lib/actions/project/deleteProject";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface DeleteProjectProviderProps {
  children: React.ReactNode;
}

export function DeleteProjectProvider({
  children,
}: DeleteProjectProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(deleteProject, {
    onSuccess: () => router.refresh(),
  });
  useShowToastOnActionError(contextValue.state);

  return (
    <DeleteProjectContext.Provider value={contextValue}>
      {children}
    </DeleteProjectContext.Provider>
  );
}
