import { type Decorator } from "@storybook/nextjs-vite";
import { MockedCreatePositionProvider } from "./MockedCreatePositionProvider";

export const withCreatePositionProvider: Decorator = (Story) => {
  return (
    <MockedCreatePositionProvider>
      <Story />
    </MockedCreatePositionProvider>
  );
};
