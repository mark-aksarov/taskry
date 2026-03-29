import { type Decorator } from "@storybook/react";
import { MockedCreateTaskProvider } from "./MockedCreateTaskProvider";

export const withCreateTaskProvider: Decorator = (Story) => {
  return (
    <MockedCreateTaskProvider>
      <Story />
    </MockedCreateTaskProvider>
  );
};
