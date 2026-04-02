"use client";

import { useRouter } from "@/i18n/navigation";
import { UpdateProjectStatusContext } from "../UpdateProjectStatusContext";
import { updateProjectStatus } from "@/lib/actions/project/updateProjectStatus";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";

interface UpdateProjectStatusProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusProvider({
  children,
}: UpdateProjectStatusProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProjectStatus, {
    onSuccess: () => router.refresh(),
  });
  const { state } = contextValue;

  useShowToastOnActionError(state);

  return (
    <UpdateProjectStatusContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusContext.Provider>
  );
}
