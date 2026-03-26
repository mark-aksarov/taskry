import { type Decorator } from "@storybook/react";
import { MockedCreateSubtaskProvider } from "./MockedCreateSubtaskProvider";

export const withCreateSubtaskProvider: Decorator = (Story) => {
  return (
    <MockedCreateSubtaskProvider>
      <Story />
    </MockedCreateSubtaskProvider>
  );
};
