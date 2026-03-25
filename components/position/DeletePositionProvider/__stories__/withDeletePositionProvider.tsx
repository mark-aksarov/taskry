import { type Decorator } from "@storybook/react";
import { MockedDeletePositionProvider } from "./MockedDeletePositionProvider";

export const withDeletePositionProvider: Decorator = (Story) => {
  return (
    <MockedDeletePositionProvider>
      <Story />
    </MockedDeletePositionProvider>
  );
};
