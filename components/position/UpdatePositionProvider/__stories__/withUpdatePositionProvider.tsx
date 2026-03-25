import { type Decorator } from "@storybook/react";
import { MockedUpdatePositionProvider } from "./MockedUpdatePositionProvider";

export const withUpdatePositionProvider: Decorator = (Story) => {
  return (
    <MockedUpdatePositionProvider>
      <Story />
    </MockedUpdatePositionProvider>
  );
};
