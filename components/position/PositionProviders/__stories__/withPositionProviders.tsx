import { type Decorator } from "@storybook/react";
import { MockedPositionProviders } from "./MockedPositionProviders";

export const withPositionProviders: Decorator = (Story) => {
  return (
    <MockedPositionProviders>
      <Story />
    </MockedPositionProviders>
  );
};
