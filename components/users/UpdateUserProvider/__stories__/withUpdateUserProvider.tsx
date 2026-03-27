import { type Decorator } from "@storybook/react";
import { UpdateUserContext } from "../../UpdateUserContext";

export const withUpdateUserProvider: Decorator = (Story) => {
  return (
    <UpdateUserContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </UpdateUserContext.Provider>
  );
};
