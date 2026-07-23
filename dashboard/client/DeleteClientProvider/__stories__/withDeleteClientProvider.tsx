import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeleteClientProvider } from "./MockedDeleteClientProvider";

export const withDeleteClientProvider: Decorator = (Story) => {
  return (
    <MockedDeleteClientProvider>
      <Story />
    </MockedDeleteClientProvider>
  );
};
