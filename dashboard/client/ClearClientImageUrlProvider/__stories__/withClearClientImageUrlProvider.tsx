import { type Decorator } from "@storybook/nextjs-vite";
import { MockedClearClientImageUrlProvider } from "./MockedClearClientImageUrlProvider";

export const withClearClientImageUrlProvider: Decorator = (Story) => {
  return (
    <MockedClearClientImageUrlProvider>
      <Story />
    </MockedClearClientImageUrlProvider>
  );
};
