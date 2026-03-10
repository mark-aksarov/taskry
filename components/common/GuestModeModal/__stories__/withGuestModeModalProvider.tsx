import { type Decorator } from "@storybook/react";
import { GuestModeModal } from "../GuestModeModal";
import { GuestModeModalProvider } from "../GuestModeModalContext";

export const withGuestModeModalProvider: Decorator = (Story) => {
  return (
    <GuestModeModalProvider>
      <Story />
      <GuestModeModal />
    </GuestModeModalProvider>
  );
};
