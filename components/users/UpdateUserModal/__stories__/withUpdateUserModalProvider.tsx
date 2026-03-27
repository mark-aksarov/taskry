import { type Decorator } from "@storybook/react";
import { UpdateUserModalProvider } from "../UpdateUserModalContext";

export const withUpdateUserModalProvider: Decorator = (Story) => {
  return (
    <UpdateUserModalProvider>
      <Story />
    </UpdateUserModalProvider>
  );
};
