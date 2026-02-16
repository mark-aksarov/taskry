"use client";

import {
  useMemo,
  useState,
  Dispatch,
  createContext,
  SetStateAction,
  useContext,
} from "react";

import { ActionFn, ActionState } from "@/lib/actions/types";

import { DeleteProjectCategoryModal } from "./DeleteProjectCategoryModal";

interface DeleteProjectCategoryModalContextType {
  state: ProjectCategoryModalState;
  setState: Dispatch<SetStateAction<ProjectCategoryModalState>>;
}

const DeleteProjectCategoryModalContext =
  createContext<DeleteProjectCategoryModalContextType | null>(null);

interface ProjectCategoryModalState {
  projectCategoryId: number;
  projectCategoryName: string;
  isOpen: boolean;
}

interface DeleteProjectCategoryModalProviderProps {
  deleteProjectCategories: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteProjectCategoryModalProvider({
  deleteProjectCategories,
  children,
}: DeleteProjectCategoryModalProviderProps) {
  const [state, setState] = useState<ProjectCategoryModalState>(() => ({
    projectCategoryId: 0,
    projectCategoryName: "",
    isOpen: false,
  }));

  const contextValue = useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );

  return (
    <DeleteProjectCategoryModalContext.Provider value={contextValue}>
      {children}

      <DeleteProjectCategoryModal
        projectCategoryId={state.projectCategoryId}
        projectCategoryName={state.projectCategoryName}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deleteProjectCategories={deleteProjectCategories}
      />
    </DeleteProjectCategoryModalContext.Provider>
  );
}

export function useDeleteProjectCategoryModal() {
  const context = useContext(DeleteProjectCategoryModalContext);

  if (!context) {
    throw new Error(
      "useDeleteProjectCategoryModal must be used within a DeleteProjectCategoryModalProvider",
    );
  }

  return context;
}
