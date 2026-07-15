import { type Decorator } from "@storybook/nextjs-vite";
import { ResetPasswordContext } from "../../ResetPasswordContext";

export const withResetPasswordProvider: Decorator = (Story) => {
  return (
    <ResetPasswordContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
      }}
    >
      <Story />
    </ResetPasswordContext.Provider>
  );
};
