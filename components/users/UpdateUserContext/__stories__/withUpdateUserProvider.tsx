import { type Decorator } from "@storybook/react";
import { UpdateUserProvider } from "../UpdateUserContext";

export const withUpdateUserProvider: Decorator = (Story) => {
  return (
    <UpdateUserProvider updateUser={() => ({ status: "success" })}>
      <Story />
    </UpdateUserProvider>
  );
};
