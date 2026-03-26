import { type Decorator } from "@storybook/react";
import { MockedSubtaskProviders } from "./MockedSubtaskProviders";

export const withSubtaskProviders: Decorator = (Story) => {
  return (
    <MockedSubtaskProviders>
      <Story />
    </MockedSubtaskProviders>
  );
};
