"use client";

import { createContext, useContext } from "react";

export interface GlobalContainerContextType {
  EditProjectFormContainer?: React.ComponentType<{
    projectId: number;
  }>;
  EditTaskFormContainer?: React.ComponentType<{
    taskId: number;
  }>;
  CustomerDetailContainer?: React.ComponentType<{
    customerId: number;
  }>;
  EditCustomerFormContainer?: React.ComponentType<{
    customerId: number;
  }>;
  NotificationModalContentContainer?: React.ComponentType;
  ProjectCommentsContainer?: React.ComponentType<{
    projectId: number;
  }>;
  ProjectDetailCompactContainer?: React.ComponentType<{
    projectId: number;
  }>;
  TaskCommentsContainer?: React.ComponentType<{
    taskId: number;
  }>;
  TaskDetailCompactContainer?: React.ComponentType<{
    taskId: number;
  }>;
  UserDetailContainer?: React.ComponentType<{
    userId: string;
  }>;
}

export const GlobalContainerContext =
  createContext<GlobalContainerContextType | null>(null);

export function GlobalContainerProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: GlobalContainerContextType;
}) {
  return (
    <GlobalContainerContext.Provider value={value}>
      {children}
    </GlobalContainerContext.Provider>
  );
}

export function useGlobalContainer() {
  const context = useContext(GlobalContainerContext);

  if (context === null) {
    throw new Error(
      "useGlobalContainer must be used within a GlobalContainerProvider",
    );
  }

  return context;
}
