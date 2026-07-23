import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreateClientProvider } from "./MockedCreateClientProvider";

export const withCreateClientProvider: Decorator = (Story) => {
  return (
    <MockedCreateClientProvider>
      <Story />
    </MockedCreateClientProvider>
  );
};
