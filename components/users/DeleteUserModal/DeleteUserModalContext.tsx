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

import { DeleteUserModal } from "./DeleteUserModal";

interface DeleteUserModalContextType {
  state: UserModalState;
  setState: Dispatch<SetStateAction<UserModalState>>;
}

const DeleteUserModalContext = createContext<DeleteUserModalContextType | null>(
  null,
);

interface UserModalState {
  userId: string;
  userFullName: string;
  isOpen: boolean;
}

interface DeleteUserModalProviderProps {
  deleteUser: ActionFn<ActionState, string>;
  children: React.ReactNode;
}

export function DeleteUserModalProvider({
  deleteUser,
  children,
}: DeleteUserModalProviderProps) {
  const [state, setState] = useState<UserModalState>(() => ({
    userId: "",
    userFullName: "",
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
    <DeleteUserModalContext.Provider value={contextValue}>
      {children}

      <DeleteUserModal
        userId={state.userId}
        userFullName={state.userFullName}
        isOpen={state.isOpen}
        onOpenChange={() => setState((prev) => ({ ...prev, isOpen: false }))}
        deleteUser={deleteUser}
      />
    </DeleteUserModalContext.Provider>
  );
}

export function useDeleteUserModal() {
  const context = useContext(DeleteUserModalContext);

  if (!context) {
    throw new Error(
      "useDeleteUserModal must be used within a DeleteUserModalProvider",
    );
  }

  return context;
}
