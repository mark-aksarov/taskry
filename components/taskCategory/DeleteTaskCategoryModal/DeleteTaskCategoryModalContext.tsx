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

import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";

interface DeleteTaskCategoryModalContextType {
  state: TaskCategoryModalState;
  setState: Dispatch<SetStateAction<TaskCategoryModalState>>;
}

const DeleteTaskCategoryModalContext =
  createContext<DeleteTaskCategoryModalContextType | null>(null);

interface TaskCategoryModalState {
  taskCategoryId: number;
  taskCategoryName: string;
  isOpen: boolean;
}

interface DeleteTaskCategoryModalProviderProps {
  deleteTaskCategories: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteTaskCategoryModalProvider({
  deleteTaskCategories,
  children,
}: DeleteTaskCategoryModalProviderProps) {
  const [state, setState] = useState<TaskCategoryModalState>(() => ({
    taskCategoryId: 0,
    taskCategoryName: "",
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
    <DeleteTaskCategoryModalContext.Provider value={contextValue}>
      {children}

      <DeleteTaskCategoryModal
        taskCategoryId={state.taskCategoryId}
        taskCategoryName={state.taskCategoryName}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deleteTaskCategories={deleteTaskCategories}
      />
    </DeleteTaskCategoryModalContext.Provider>
  );
}

export function useDeleteTaskCategoryModal() {
  const context = useContext(DeleteTaskCategoryModalContext);

  if (!context) {
    throw new Error(
      "useDeleteTaskCategoryModal must be used within a DeleteTaskCategoryModalProvider",
    );
  }

  return context;
}
