import { Decorator } from "@storybook/nextjs-vite";
import { MockedTaskItemWrapper } from "./MockedTaskItemWrapper";

export const withMockedTaskItemWrapper: Decorator = (Story) => {
  return (
    <MockedTaskItemWrapper>
      <Story />
    </MockedTaskItemWrapper>
  );
};
