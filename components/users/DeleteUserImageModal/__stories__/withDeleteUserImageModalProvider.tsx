import { type Decorator } from "@storybook/react";
import { DeleteUserImageModalProvider } from "../DeleteUserImageModalContext";

export const withDeleteUserImageModalProvider: Decorator = (Story) => {
  return (
    <DeleteUserImageModalProvider>
      <Story />
    </DeleteUserImageModalProvider>
  );
};
