import { type Decorator } from "@storybook/react";
import { MockedToggleSubtaskProvider } from "./MockedToggleSubtaskProvider";

export const withToggleSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedToggleSubtaskProvider>
      <Story />
    </MockedToggleSubtaskProvider>
  );
};
