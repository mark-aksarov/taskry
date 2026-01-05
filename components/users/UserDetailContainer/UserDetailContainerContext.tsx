"use client";

import { createContext } from "react";
import { UserDetailContainer as DefaultUserDetailContainer } from "./UserDetailContainer";

type UserDetailContainerType = React.ComponentType<{
  userId: string;
}>;

export const UserDetailContainerContext =
  createContext<UserDetailContainerType>(DefaultUserDetailContainer);
