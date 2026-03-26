import { type Decorator } from "@storybook/react";
import { MockedDeleteSubtaskProvider } from "./MockedDeleteSubtaskProvider";

export const withDeleteSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedDeleteSubtaskProvider>
      <Story />
    </MockedDeleteSubtaskProvider>
  );
};
