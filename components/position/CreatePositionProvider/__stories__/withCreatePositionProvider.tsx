import { type Decorator } from "@storybook/react";
import { MockedCreatePositionProvider } from "./MockedCreatePositionProvider";

export const withCreatePositionProvider: Decorator = (Story) => {
  return (
    <MockedCreatePositionProvider>
      <Story />
    </MockedCreatePositionProvider>
  );
};
