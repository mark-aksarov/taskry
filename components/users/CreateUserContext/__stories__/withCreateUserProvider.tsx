import { type Decorator } from "@storybook/react";
import { CreateUserProvider } from "../../CreateUserContext";

export const withCreateUserProvider: Decorator = (Story) => {
  return (
    <CreateUserProvider createUser={() => ({ status: "success" })}>
      <Story />
    </CreateUserProvider>
  );
};
