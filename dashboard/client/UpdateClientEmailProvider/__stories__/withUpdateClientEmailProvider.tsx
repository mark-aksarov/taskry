import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientEmailProvider } from "./MockedUpdateClientEmailProvider";

export const withUpdateClientEmailProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientEmailProvider>
      <Story />
    </MockedUpdateClientEmailProvider>
  );
};
