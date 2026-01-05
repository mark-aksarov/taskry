"use client";

import { createContext } from "react";
import { NotificationModalContentContainer as DefaultNotificationModalContentContainer } from "./NotificationModalContentContainer";

type NotificationModalContentContainerType = React.ComponentType;

export const NotificationModalContentContainerContext =
  createContext<NotificationModalContentContainerType>(
    DefaultNotificationModalContentContainer,
  );
