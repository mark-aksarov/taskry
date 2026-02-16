"use client";

import {
  useMemo,
  useState,
  Dispatch,
  createContext,
  SetStateAction,
  useContext,
} from "react";

import { DeletePositionModal } from "./DeletePositionModal";
import { ActionFn, ActionState } from "@/lib/actions/types";

interface DeletePositionModalContextType {
  state: PositionModalState;
  setState: Dispatch<SetStateAction<PositionModalState>>;
}

const DeletePositionModalContext =
  createContext<DeletePositionModalContextType | null>(null);

interface PositionModalState {
  positionId: number;
  positionName: string;
  isOpen: boolean;
}

interface DeletePositionModalProviderProps {
  deletePositions: ActionFn<ActionState, number[]>;
  children: React.ReactNode;
}

export function DeletePositionModalProvider({
  deletePositions,
  children,
}: DeletePositionModalProviderProps) {
  const [state, setState] = useState<PositionModalState>(() => ({
    positionId: 0,
    positionName: "",
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
    <DeletePositionModalContext.Provider value={contextValue}>
      {children}

      <DeletePositionModal
        positionId={state.positionId}
        positionName={state.positionName}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deletePositions={deletePositions}
      />
    </DeletePositionModalContext.Provider>
  );
}

export function useDeletePositionModal() {
  const context = useContext(DeletePositionModalContext);

  if (!context) {
    throw new Error(
      "useDeletePositionModal must be used within a DeletePositionModalProvider",
    );
  }

  return context;
}
