import { type Decorator } from "@storybook/react";
import { SelectedItemsProvider } from "../SelectedItemsContext";

export const withSelectedItemsProvider: Decorator = (Story) => {
  return (
    <SelectedItemsProvider pageItems={[]}>
      <Story />
    </SelectedItemsProvider>
  );
};
