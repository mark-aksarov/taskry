import { type Decorator } from "@storybook/nextjs-vite";
import { SelectedItemsProvider } from "../SelectedItemsContext";

export const withSelectedItemsProvider: Decorator = (Story) => {
  return (
    <SelectedItemsProvider pageItems={[{ id: 1 }, { id: 2 }, { id: 3 }]}>
      <Story />
    </SelectedItemsProvider>
  );
};
