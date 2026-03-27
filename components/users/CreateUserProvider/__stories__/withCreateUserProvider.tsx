import { type Decorator } from "@storybook/react";
import { CreateUserContext } from "../../CreateUserContext";

export const withCreateUserProvider: Decorator = (Story) => {
  return (
    <CreateUserContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </CreateUserContext.Provider>
  );
};
