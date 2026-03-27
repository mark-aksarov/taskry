import { type Decorator } from "@storybook/react";
import { DeleteUserModalProvider } from "../DeleteUserModalContext";

export const withDeleteUserModalProvider: Decorator = (Story) => {
  return (
    <DeleteUserModalProvider>
      <Story />
    </DeleteUserModalProvider>
  );
};
