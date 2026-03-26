import { type Decorator } from "@storybook/react";
import { MockedProjectItemProviders } from "./MockedProjectItemProviders";

export const withProjectItemProviders: Decorator = (Story) => {
  return (
    <MockedProjectItemProviders>
      <Story />
    </MockedProjectItemProviders>
  );
};
