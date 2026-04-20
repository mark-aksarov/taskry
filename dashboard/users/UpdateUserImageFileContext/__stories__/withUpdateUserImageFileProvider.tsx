import { type Decorator } from "@storybook/nextjs-vite";
import { UpdateUserImageFileProvider } from "../UpdateUserImageFileContext";

export const withUpdateUserImageFileProvider: Decorator = (Story) => {
  return (
    <UpdateUserImageFileProvider>
      <Story />
    </UpdateUserImageFileProvider>
  );
};
