import { type Decorator } from "@storybook/react";
import { MockedDeleteTaskProvider } from "./MockedDeleteTaskProvider";

export const withDeleteTaskProvider: Decorator = (Story) => {
  return (
    <MockedDeleteTaskProvider>
      <Story />
    </MockedDeleteTaskProvider>
  );
};
