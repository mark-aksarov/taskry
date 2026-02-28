import { type Decorator } from "@storybook/react";
import { DeleteUserProvider } from "../DeleteUserContext";

export const withDeleteUserProvider: Decorator = (Story) => {
  return (
    <DeleteUserProvider deleteUser={() => ({ status: "success" })}>
      <Story />
    </DeleteUserProvider>
  );
};
