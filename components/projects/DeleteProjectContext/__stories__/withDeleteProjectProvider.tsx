import { type Decorator } from "@storybook/react";
import { DeleteProjectProvider } from "../DeleteProjectContext";

export const withDeleteProjectProvider: Decorator = (Story) => {
  return (
    <DeleteProjectProvider deleteProject={() => ({ status: "success" })}>
      <Story />
    </DeleteProjectProvider>
  );
};
