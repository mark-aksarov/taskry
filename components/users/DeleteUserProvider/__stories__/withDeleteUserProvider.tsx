import { type Decorator } from "@storybook/react";
import { DeleteUserContext } from "../../DeleteUserContext";

export const withDeleteUserProvider: Decorator = (Story) => {
  return (
    <DeleteUserContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </DeleteUserContext.Provider>
  );
};
