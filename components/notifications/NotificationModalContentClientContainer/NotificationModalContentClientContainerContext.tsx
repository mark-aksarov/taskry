"use client";

import { createContext } from "react";
import { NotificationModalContentClientContainer as DefaultNotificationModalContentClientContainer } from "./NotificationModalContentClientContainer";

type NotificationModalContentClientContainerType = React.ComponentType;

export const NotificationModalContentClientContainerContext =
  createContext<NotificationModalContentClientContainerType>(
    DefaultNotificationModalContentClientContainer,
  );
