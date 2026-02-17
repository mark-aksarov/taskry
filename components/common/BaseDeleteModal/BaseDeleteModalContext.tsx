"use client";

import { ActionFn, ActionState } from "@/lib/actions/types";
import { useMemo, useState, Dispatch, SetStateAction } from "react";

interface DeleteModalState<IdType> {
  entityId: IdType | null;
  entityName: string;
  isOpen: boolean;
}

export interface DeleteModalContextType<IdType> {
  state: DeleteModalState<IdType>;
  setState: Dispatch<SetStateAction<DeleteModalState<IdType>>>;
}

export interface DeleteModalProviderProps<TPayload> {
  deleteEntity: ActionFn<ActionState, TPayload>;
  children: React.ReactNode;
}

export function useDeleteModalContextState<IdType>() {
  const [state, setState] = useState<DeleteModalState<IdType>>(() => ({
    entityId: null,
    entityName: "",
    isOpen: false,
  }));

  return useMemo(
    () => ({
      state,
      setState,
    }),
    [state, setState],
  );
}
