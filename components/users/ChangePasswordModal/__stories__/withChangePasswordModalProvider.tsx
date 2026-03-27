import { type Decorator } from "@storybook/react";
import { ChangePasswordModalProvider } from "../ChangePasswordModalContext";

export const withChangePasswordModalProvider: Decorator = (Story) => {
  return (
    <ChangePasswordModalProvider>
      <Story />
    </ChangePasswordModalProvider>
  );
};
