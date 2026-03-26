import { type Decorator } from "@storybook/react";
import { MockedTaskDetailProviders } from "./MockedTaskDetailProviders";

export const withTaskDetailProviders: Decorator = (Story) => {
  return (
    <MockedTaskDetailProviders>
      <Story />
    </MockedTaskDetailProviders>
  );
};
