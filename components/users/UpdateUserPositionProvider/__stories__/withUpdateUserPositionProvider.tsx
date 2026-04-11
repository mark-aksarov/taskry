import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserPositionProvider } from "./MockedUpdateUserPositionProvider";

export const withUpdateUserPositionProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserPositionProvider>
      <Story />
    </MockedUpdateUserPositionProvider>
  );
};
