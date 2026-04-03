import { type Decorator } from "@storybook/nextjs-vite";
import { MockedClearUserImageUrlProvider } from "./MockedClearUserImageUrlProvider";

export const withClearUserImageUrlProvider: Decorator = (Story) => {
  return (
    <MockedClearUserImageUrlProvider>
      <Story />
    </MockedClearUserImageUrlProvider>
  );
};
