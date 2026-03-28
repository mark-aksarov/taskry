import { Decorator } from "@storybook/nextjs-vite";
import { MockedProjectItemWrapper } from "./MockedProjectItemWrapper";

export const withMockedProjectItemWrapper: Decorator = (Story) => {
  return (
    <MockedProjectItemWrapper>
      <Story />
    </MockedProjectItemWrapper>
  );
};
