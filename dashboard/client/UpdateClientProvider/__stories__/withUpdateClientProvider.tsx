import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientProvider } from "./MockedUpdateClientProvider";

export const withUpdateClientProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientProvider>
      <Story />
    </MockedUpdateClientProvider>
  );
};
