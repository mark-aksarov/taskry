import { type Decorator } from "@storybook/react";
import { MockedProjectDetailProviders } from "./MockedProjectDetailProviders";

export const withProjectDetailProviders: Decorator = (Story) => {
  return (
    <MockedProjectDetailProviders>
      <Story />
    </MockedProjectDetailProviders>
  );
};
