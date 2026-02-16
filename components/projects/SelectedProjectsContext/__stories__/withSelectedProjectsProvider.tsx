import { type Decorator } from "@storybook/react";
import { SelectedProjectsProvider } from "../SelectedProjectsContext";

export const withSelectedProjectsProvider: Decorator = (Story) => {
  return (
    <SelectedProjectsProvider pageItems={[]}>
      <Story />
    </SelectedProjectsProvider>
  );
};
