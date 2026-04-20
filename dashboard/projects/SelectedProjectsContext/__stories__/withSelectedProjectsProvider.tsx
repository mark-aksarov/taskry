import { type Decorator } from "@storybook/nextjs-vite";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";

export const withSelectedProjectsProvider: Decorator = (Story) => {
  return (
    <SelectedProjectsProvider pageItems={[]}>
      <Story />
    </SelectedProjectsProvider>
  );
};
