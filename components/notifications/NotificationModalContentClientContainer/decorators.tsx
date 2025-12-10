import React from "react";
import { type Decorator } from "@storybook/react";
import { NotificationList } from "../NotificationList";
import { NotificationModalContent } from "../NotificationModalContent";
import { NotificationFilterToggleButtonGroup } from "../NotificationFilterToggleButtonGroup";
import { Default as NotificationListStory } from "../NotificationList/NotificationList.stories";
import { NotificationModalContentClientContainerContext } from "./NotificationModalContentClientContainerContext";

export const withNotificationModalContent: Decorator = (Story) => {
  return (
    <NotificationModalContentClientContainerContext.Provider
      value={() => (
        <NotificationModalContent>
          <NotificationFilterToggleButtonGroup
            notificationsCount={10}
            unreadCount={5}
          />
          <NotificationList {...NotificationListStory.args} />
        </NotificationModalContent>
      )}
    >
      <Story />
    </NotificationModalContentClientContainerContext.Provider>
  );
};
