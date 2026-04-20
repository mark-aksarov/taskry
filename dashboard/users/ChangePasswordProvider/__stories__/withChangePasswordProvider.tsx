import { type Decorator } from "@storybook/nextjs-vite";
import { ChangePasswordContext } from "../../ChangePasswordContext";

export const withChangePasswordProvider: Decorator = (Story) => {
  return (
    <ChangePasswordContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </ChangePasswordContext.Provider>
  );
};
