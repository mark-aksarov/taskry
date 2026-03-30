import { Decorator } from "@storybook/nextjs-vite";
import { MockedUserItemWrapper } from "./MockedUserItemWrapper";

export const withMockedUserItemWrapper: Decorator = (Story) => {
  return (
    <MockedUserItemWrapper>
      <Story />
    </MockedUserItemWrapper>
  );
};
