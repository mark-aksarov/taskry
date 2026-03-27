import { type Decorator } from "@storybook/react";
import { ClearCustomerImageUrlContext } from "../../ClearCustomerImageUrlContext";

export const withClearCustomerImageUrlProvider: Decorator = (Story) => {
  return (
    <ClearCustomerImageUrlContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </ClearCustomerImageUrlContext.Provider>
  );
};
