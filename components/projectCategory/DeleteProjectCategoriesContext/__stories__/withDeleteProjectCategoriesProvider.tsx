import { type Decorator } from "@storybook/react";
import { DeleteProjectCategoriesProvider } from "../../DeleteProjectCategoriesContext";

export const withDeleteProjectCategoriesProvider: Decorator = (Story) => {
  return (
    <DeleteProjectCategoriesProvider
      deleteProjectCategories={() => ({ status: "success" })}
    >
      <Story />
    </DeleteProjectCategoriesProvider>
  );
};
