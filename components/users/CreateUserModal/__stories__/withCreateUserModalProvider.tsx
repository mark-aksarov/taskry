import { type Decorator } from "@storybook/react";
import { CreateUserModalProvider } from "../CreateUserModalContext";

export const withCreateUserModalProvider: Decorator = (Story) => {
  return (
    <CreateUserModalProvider>
      <Story />
    </CreateUserModalProvider>
  );
};
