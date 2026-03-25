import { type Decorator } from "@storybook/react";
import { MockedProjectProviders } from "./MockedProjectProviders";

export const withProjectProviders: Decorator = (Story) => {
  return (
    <MockedProjectProviders>
      <Story />
    </MockedProjectProviders>
  );
};
