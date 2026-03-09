import { type Decorator } from "@storybook/react";
import { DeleteProjectsProvider } from "../DeleteProjectsContext";

export const withDeleteProjectsProvider: Decorator = (Story) => {
  return (
    <DeleteProjectsProvider deleteProjects={() => ({ status: "success" })}>
      <Story />
    </DeleteProjectsProvider>
  );
};
