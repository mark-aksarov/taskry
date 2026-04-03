import { type Decorator } from "@storybook/nextjs-vite";
import { MockedDeletePositionProvider } from "./MockedDeletePositionProvider";

export const withDeletePositionProvider: Decorator = (Story) => {
  return (
    <MockedDeletePositionProvider>
      <Story />
    </MockedDeletePositionProvider>
  );
};
