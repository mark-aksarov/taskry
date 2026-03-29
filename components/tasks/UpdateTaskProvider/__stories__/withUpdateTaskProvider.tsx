import { type Decorator } from "@storybook/react";
import { MockedUpdateTaskProvider } from "./MockedUpdateTaskProvider";

export const withUpdateTaskProvider: Decorator = (Story) => {
  return (
    <MockedUpdateTaskProvider>
      <Story />
    </MockedUpdateTaskProvider>
  );
};
