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

import { DeleteTaskModal } from "./DeleteTaskModal";

interface DeleteTaskModalContextType {
  state: TaskModalState;
  setState: Dispatch<SetStateAction<TaskModalState>>;
}

const DeleteTaskModalContext = createContext<DeleteTaskModalContextType | null>(
  null,
);

interface TaskModalState {
  taskId: number;
  taskTitle: string;
  isOpen: boolean;
}

interface DeleteTaskModalProviderProps {
  deleteTask: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeleteTaskModalProvider({
  deleteTask,
  children,
}: DeleteTaskModalProviderProps) {
  const [state, setState] = useState<TaskModalState>(() => ({
    taskId: 0,
    taskTitle: "",
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
    <DeleteTaskModalContext.Provider value={contextValue}>
      {children}

      <DeleteTaskModal
        taskId={state.taskId}
        taskTitle={state.taskTitle}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deleteTask={deleteTask}
      />
    </DeleteTaskModalContext.Provider>
  );
}

export function useDeleteTaskModal() {
  const context = useContext(DeleteTaskModalContext);

  if (!context) {
    throw new Error(
      "useDeleteTaskModal must be used within a DeleteTaskModalProvider",
    );
  }

  return context;
}
