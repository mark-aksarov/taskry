import { type Decorator } from "@storybook/react";
import { MockedClearUserImageUrlProvider } from "./MockedClearUserImageUrlProvider";

export const withClearUserImageUrlProvider: Decorator = (Story) => {
  return (
    <MockedClearUserImageUrlProvider>
      <Story />
    </MockedClearUserImageUrlProvider>
  );
};
