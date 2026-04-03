import { type Decorator } from "@storybook/nextjs-vite";
import { MockedUpdateUserImageProvider } from "./MockedUpdateUserImageProvider";

export const withUpdateUserImageProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserImageProvider>
      <Story />
    </MockedUpdateUserImageProvider>
  );
};
