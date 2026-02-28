"use client";

import {
  useMemo,
  useContext,
  createContext,
  useTransition,
  TransitionStartFunction,
  useState,
} from "react";

interface DeletePositionsContextType {
  isPending: boolean;
  startTransition: TransitionStartFunction;
  positionIds: number[];
  setPositionIds: (positionIds: number[]) => void;
}

const DeletePositionsContext = createContext<DeletePositionsContextType | null>(
  null,
);

interface DeletePositionsProviderProps {
  children: React.ReactNode;
}

export function DeletePositionsProvider({
  children,
}: DeletePositionsProviderProps) {
  const [isPending, startTransition] = useTransition();
  const [positionIds, setPositionIds] = useState<number[]>([]);

  const contextValue = useMemo(
    () => ({
      isPending,
      startTransition,
      positionIds,
      setPositionIds,
    }),
    [isPending, positionIds],
  );

  return (
    <DeletePositionsContext.Provider value={contextValue}>
      {children}
    </DeletePositionsContext.Provider>
  );
}

export function useDeletePositions() {
  const context = useContext(DeletePositionsContext);
  if (!context) {
    throw new Error(
      "useDeletePositions must be used within a DeletePositionsProvider",
    );
  }
  return context;
}
