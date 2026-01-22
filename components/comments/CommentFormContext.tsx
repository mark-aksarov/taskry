"use client";

import {
  useMemo,
  useState,
  Dispatch,
  useContext,
  createContext,
  SetStateAction,
} from "react";

interface CommentFormContextProps {
  editCommentId?: number;
  setEditCommentId: Dispatch<SetStateAction<number | undefined>>;
  commentContent: string;
  setCommentContent: Dispatch<SetStateAction<string>>;
}

export const CommentFormContext = createContext<CommentFormContextProps | null>(
  null,
);

interface CommentFormProviderProps {
  children: React.ReactNode;
}

export function CommentFormProvider({ children }: CommentFormProviderProps) {
  const [editCommentId, setEditCommentId] = useState<number>();
  const [commentContent, setCommentContent] = useState("");

  const contextValue = useMemo(
    () => ({
      editCommentId,
      setEditCommentId,
      commentContent,
      setCommentContent,
    }),
    [editCommentId, commentContent],
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
