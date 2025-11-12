"use client";

import { createContext, useContext } from "react";
import { CommentsContainer as DefaultCommentsContainer } from "./CommentsContainer";

type CommentsContainerType = React.ComponentType<{ taskId: number }>;

const CommentsContainerContext = createContext<CommentsContainerType | null>(
  null,
);

interface CommentsContainerProviderProps {
  CommentsContainer?: CommentsContainerType;
  children: React.ReactNode;
}

export function CommentsContainerProvider({
  CommentsContainer = DefaultCommentsContainer,
  children,
}: CommentsContainerProviderProps) {
  return (
    <CommentsContainerContext.Provider value={CommentsContainer}>
      {children}
    </CommentsContainerContext.Provider>
  );
}

export function useCommentsContainer(): CommentsContainerType {
  const context = useContext(CommentsContainerContext);
  if (!context) {
    throw new Error(
      "useCommentsContainer must be used within a CommentsContainerProvider",
    );
  }
  return context;
}
