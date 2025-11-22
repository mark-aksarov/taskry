"use client";

import { createContext } from "react";
import { UserDetailClientContainer as DefaultUserDetailClientContainer } from "./UserDetailClientContainer";

type UserDetailClientContainerType = React.ComponentType<{
  userId: string;
}>;

export const UserDetailClientContainerContext =
  createContext<UserDetailClientContainerType>(
    DefaultUserDetailClientContainer,
  );
