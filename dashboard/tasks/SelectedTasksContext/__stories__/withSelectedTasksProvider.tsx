import { type Decorator } from "@storybook/nextjs-vite";
import { SelectedTasksProvider } from "../SelectedTasksContext";

export const withSelectedTasksProvider: Decorator = (Story) => {
  return (
    <SelectedTasksProvider pageItems={[]}>
      <Story />
    </SelectedTasksProvider>
  );
};
