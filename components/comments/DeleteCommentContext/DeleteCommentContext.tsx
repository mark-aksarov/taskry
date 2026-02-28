"use client";

import { useTranslations } from "next-intl";
import { useMemo, useContext, createContext } from "react";
import { ActionFn, ActionState } from "@/lib/actions/types";
import { useDeleteActionState } from "@/lib/hooks/useDeleteActionState";

interface DeleteCommentContextType {
  action: (payload: number) => void;
  isPending: boolean;
}

const DeleteCommentContext = createContext<DeleteCommentContextType | null>(
  null,
);

interface DeleteCommentProviderProps {
  deleteComment: ActionFn<ActionState, number>;
  mutate: () => void;
  children: React.ReactNode;
}

export function DeleteCommentProvider({
  deleteComment,
  mutate,
  children,
}: DeleteCommentProviderProps) {
  const t = useTranslations("comments.DeleteCommentProvider");

  const [, action, isPending] = useDeleteActionState({
    deleteEntity: deleteComment,
    onSuccess: mutate,
    successMessage: t("successMessage"),
  });

  const contextValue = useMemo(
    () => ({ action, isPending }),
    [action, isPending],
  );

  return (
    <DeleteCommentContext.Provider value={contextValue}>
      {children}
    </DeleteCommentContext.Provider>
  );
}

export function useDeleteCommentContext() {
  const context = useContext(DeleteCommentContext);
  if (!context) {
    throw new Error(
      "useDeleteCommentContext must be used within a DeleteCommentProvider",
    );
  }
  return context;
}
