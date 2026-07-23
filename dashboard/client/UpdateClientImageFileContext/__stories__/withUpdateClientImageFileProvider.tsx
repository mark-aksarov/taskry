import { type Decorator } from "@storybook/nextjs-vite";
import { UpdateClientImageFileProvider } from "../UpdateClientImageFileContext";

export const withUpdateClientImageFileProvider: Decorator = (Story) => {
  return (
    <UpdateClientImageFileProvider>
      <Story />
    </UpdateClientImageFileProvider>
  );
};
