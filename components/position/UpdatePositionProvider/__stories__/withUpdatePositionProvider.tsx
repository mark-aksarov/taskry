import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdatePositionProvider } from "./MockedUpdatePositionProvider";

export const withUpdatePositionProvider: Decorator = (Story) => {
  return (
    <MockedUpdatePositionProvider>
      <Story />
    </MockedUpdatePositionProvider>
  );
};
