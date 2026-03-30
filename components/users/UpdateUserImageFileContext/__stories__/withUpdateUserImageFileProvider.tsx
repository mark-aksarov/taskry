import { type Decorator } from "@storybook/react";
import { UpdateUserImageFileProvider } from "../UpdateUserImageFileContext";

export const withUpdateUserImageFileProvider: Decorator = (Story) => {
  return (
    <UpdateUserImageFileProvider>
      <Story />
    </UpdateUserImageFileProvider>
  );
};
