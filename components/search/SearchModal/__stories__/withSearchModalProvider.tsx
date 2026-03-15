import { Decorator } from "@storybook/nextjs-vite";
import { SearchModalProvider } from "../SearchModalContext";

export const withSearchModalProvider: Decorator = (Story) => {
  return (
    <SearchModalProvider>
      <Story />
    </SearchModalProvider>
  );
};
