import { type Decorator } from "@storybook/react";
import { ChangePasswordProvider } from "../ChangePasswordContext";

export const withChangePasswordProvider: Decorator = (Story) => {
  return (
    <ChangePasswordProvider changePassword={() => ({ status: "success" })}>
      <Story />
    </ChangePasswordProvider>
  );
};
