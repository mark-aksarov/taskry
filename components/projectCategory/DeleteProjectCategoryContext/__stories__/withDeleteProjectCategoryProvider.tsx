import { type Decorator } from "@storybook/react";
import { DeleteProjectCategoryProvider } from "../DeleteProjectCategoryContext";

export const withDeleteProjectCategoryProvider: Decorator = (Story) => {
  return (
    <DeleteProjectCategoryProvider
      deleteProjectCategory={() => ({ status: "success" })}
    >
      <Story />
    </DeleteProjectCategoryProvider>
  );
};
