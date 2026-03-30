import { type Decorator } from "@storybook/react";
import { MockedUpdateUserImageProvider } from "./MockedUpdateUserImageProvider";

export const withUpdateUserImageProvider: Decorator = (Story) => {
  return (
    <MockedUpdateUserImageProvider>
      <Story />
    </MockedUpdateUserImageProvider>
  );
};
