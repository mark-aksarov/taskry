"use client";

import { useMemo, useState, useContext, createContext } from "react";

interface CommentFormContextType {
  entityId: number;
  entityKey: string;
  mutateUrl: string;
  editCommentId?: number;
  setEditCommentId: (id?: number) => void;
  commentContent: string;
  setCommentContent: (content: string) => void;
}

export const CommentFormContext = createContext<CommentFormContextType | null>(
  null,
);

interface CommentFormProviderProps {
  entityId: number;
  entityKey: string;
  mutateUrl: string;
  children: React.ReactNode;
}

export function CommentFormProvider({
  entityId,
  entityKey,
  mutateUrl,
  children,
}: CommentFormProviderProps) {
  const [editCommentId, setEditCommentId] = useState<number>();
  const [commentContent, setCommentContent] = useState("");

  const contextValue = useMemo(
    () => ({
      entityId,
      entityKey,
      mutateUrl,
      editCommentId,
      setEditCommentId,
      commentContent,
      setCommentContent,
    }),
    [entityId, entityKey, mutateUrl, editCommentId, commentContent],
  );

  return (
    <CommentFormContext.Provider value={contextValue}>
      {children}
    </CommentFormContext.Provider>
  );
}

export function useCommentFormContext() {
  const context = useContext(CommentFormContext);
  if (context === null) {
    throw new Error(
      "useCommentFormContext must be used within a CommentFormProvider",
    );
  }
  return context;
}
