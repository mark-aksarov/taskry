"use client";

import { createContext, useContext } from "react";

type SearchContainerType = React.ComponentType<{
  query: string;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchField: React.ReactNode;
  searchToggleButtonGroup: React.ReactNode;
}>;

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
  NotificationModalContentContainer?: React.ComponentType<{
    guestMode?: boolean;
  }>;
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
  UsersSearchContainer?: SearchContainerType;
  TasksSearchContainer?: SearchContainerType;
  ProjectsSearchContainer?: SearchContainerType;
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
