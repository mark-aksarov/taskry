"use client";

import { useContext, createContext } from "react";

interface ProfileActionsContextType {
  showUserActions: boolean;
  userId: string;
  userFullName: string;
}

const ProfileActionsContext = createContext<ProfileActionsContextType | null>(
  null,
);

interface ProfileActionsProviderProps {
  value: ProfileActionsContextType;
  children: React.ReactNode;
}

export function ProfileActionsProvider({
  value,
  children,
}: ProfileActionsProviderProps) {
  return (
    <ProfileActionsContext.Provider value={value}>
      {children}
    </ProfileActionsContext.Provider>
  );
}

export function useProfileActions() {
  const context = useContext(ProfileActionsContext);
  if (!context)
    throw new Error(
      "useProfileActions must be used within ProfileActionsProvider",
    );
  return context;
}
