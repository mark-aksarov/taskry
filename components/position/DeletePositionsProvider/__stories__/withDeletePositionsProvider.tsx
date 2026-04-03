import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeletePositionsProvider } from "./MockedDeletePositionsProvider";

export const withDeletePositionsProvider: Decorator = (Story) => {
  return (
    <MockedDeletePositionsProvider>
      <Story />
    </MockedDeletePositionsProvider>
  );
};
