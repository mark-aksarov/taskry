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

import { DeleteProjectModal } from "./DeleteProjectModal";

interface DeleteProjectModalContextType {
  state: ProjectModalState;
  setState: Dispatch<SetStateAction<ProjectModalState>>;
}

const DeleteProjectModalContext =
  createContext<DeleteProjectModalContextType | null>(null);

interface ProjectModalState {
  projectId: number;
  projectTitle: string;
  isOpen: boolean;
}

interface DeleteProjectModalProviderProps {
  deleteProjects: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteProjectModalProvider({
  deleteProjects,
  children,
}: DeleteProjectModalProviderProps) {
  const [state, setState] = useState<ProjectModalState>(() => ({
    projectId: 0,
    projectTitle: "",
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
    <DeleteProjectModalContext.Provider value={contextValue}>
      {children}

      <DeleteProjectModal
        projectId={state.projectId}
        projectTitle={state.projectTitle}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deleteProjects={deleteProjects}
      />
    </DeleteProjectModalContext.Provider>
  );
}

export function useDeleteProjectModal() {
  const context = useContext(DeleteProjectModalContext);

  if (!context) {
    throw new Error(
      "useDeleteProjectModal must be used within a DeleteProjectModalProvider",
    );
  }

  return context;
}
