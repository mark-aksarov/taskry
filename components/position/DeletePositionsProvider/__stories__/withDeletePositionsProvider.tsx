import { type Decorator } from "@storybook/react";
import { MockedDeletePositionsProvider } from "./MockedDeletePositionsProvider";

export const withDeletePositionsProvider: Decorator = (Story) => {
  return (
    <MockedDeletePositionsProvider>
      <Story />
    </MockedDeletePositionsProvider>
  );
};
