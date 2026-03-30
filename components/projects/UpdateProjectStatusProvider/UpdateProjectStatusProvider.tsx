"use client";

import { notFound } from "next/navigation";
import { usePathname } from "@/i18n/navigation";
import { UpdateProjectStatusContext } from "../UpdateProjectStatusContext";
import { updateProjectStatus } from "@/lib/actions/project/updateProjectStatus";
import { useShowToastOnActionError } from "@/lib/hooks/useShowToastOnActionError";
import { useActionStateWithRouteRefresh } from "@/lib/hooks/useActionStateWithRouteRefresh";

interface UpdateProjectStatusProviderProps {
  children: React.ReactNode;
}

export function UpdateProjectStatusProvider({
  children,
}: UpdateProjectStatusProviderProps) {
  const pathname = usePathname();
  const contextValue = useActionStateWithRouteRefresh(updateProjectStatus);
  const { state } = contextValue;

  // if the project was not found (e.g. deleted by another user)
  // from the projects page, show error.tsx
  // from the project detail page, show not-found.tsx
  if (state.status === "error" && state.errorCode === "notFound") {
    if (pathname === "/projects") {
      throw new Error(state.message, { cause: "projectNotFound" });
    }

    notFound();
  }

  useShowToastOnActionError(state);

  return (
    <UpdateProjectStatusContext.Provider value={contextValue}>
      {children}
    </UpdateProjectStatusContext.Provider>
  );
}
