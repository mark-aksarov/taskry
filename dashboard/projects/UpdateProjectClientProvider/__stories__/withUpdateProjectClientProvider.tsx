import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateProjectClientProvider } from "./MockedUpdateProjectClientProvider";

export const withUpdateProjectClientProvider: Decorator = (Story) => {
  return (
    <MockedUpdateProjectClientProvider>
      <Story />
    </MockedUpdateProjectClientProvider>
  );
};
