import { type Decorator } from "@storybook/react";
import { DeleteUserImageProvider } from "../DeleteUserImageContext";

export const withDeleteUserImageProvider: Decorator = (Story) => {
  return (
    <DeleteUserImageProvider updateUserImageUrl={() => ({ status: "success" })}>
      <Story />
    </DeleteUserImageProvider>
  );
};
