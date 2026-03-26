import { type Decorator } from "@storybook/react";
import { MockedUpdateSubtaskProvider } from "./MockedUpdateSubtaskProvider";

export const withUpdateSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedUpdateSubtaskProvider>
      <Story />
    </MockedUpdateSubtaskProvider>
  );
};
