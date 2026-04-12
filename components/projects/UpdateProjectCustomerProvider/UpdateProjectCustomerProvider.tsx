"use client";

import { useRouter } from "@/i18n/navigation";
import { updateProject } from "@/lib/actions/project/updateProject";
import { UpdateProjectCustomerContext } from "../UpdateProjectCustomerContext";
import { useActionStateWithCallbacks } from "@/lib/hooks/useActionStateWithCallbacks";
import { useShowToastWhenModalClosedOnActionError } from "@/lib/hooks/useShowToastWhenModalClosedOnActionError";
import { useCloseModalThenShowToastOnActionSuccess } from "@/lib/hooks/useCloseModalThenShowToastOnActionSuccess";
import { useShowToastWhenModalClosedOnActionSuccess } from "@/lib/hooks/useShowToastWhenModalClosedOnActionSuccess";

interface UpdateProjectCustomerProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectCustomerProvider({
  children,
}: UpdateProjectCustomerProviderProps) {
  const router = useRouter();
  const contextValue = useActionStateWithCallbacks(updateProject, {
    onSuccess: () => router.refresh(),
  });

  const { state } = contextValue;

  useCloseModalThenShowToastOnActionSuccess(state, "updateProjectCustomer");
  useShowToastWhenModalClosedOnActionSuccess(state, "updateProjectCustomer");
  useShowToastWhenModalClosedOnActionError(state, "updateProjectCustomer");

  return (
    <UpdateProjectCustomerContext.Provider value={contextValue}>
      {children}
    </UpdateProjectCustomerContext.Provider>
  );
}
