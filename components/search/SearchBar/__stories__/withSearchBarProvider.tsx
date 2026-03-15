import { Decorator } from "@storybook/nextjs-vite";
import { SearchBarProvider } from "../SearchBarContext";

export const withSearchBarProvider: Decorator = (Story) => {
  return (
    <SearchBarProvider initialValue="">
      <Story />
    </SearchBarProvider>
  );
};
