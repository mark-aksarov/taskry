import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateClientImageProvider } from "./MockedUpdateClientImageProvider";

export const withUpdateClientImageProvider: Decorator = (Story) => {
  return (
    <MockedUpdateClientImageProvider>
      <Story />
    </MockedUpdateClientImageProvider>
  );
};
