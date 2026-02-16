import { type Decorator } from "@storybook/react";
import { DeleteProjectCategoryModalProvider } from "..";

export const withDeleteProjectCategoryModalProvider: Decorator = (Story) => {
  return (
    <DeleteProjectCategoryModalProvider
      deleteProjectCategories={() => ({ status: "success" })}
    >
      <Story />
    </DeleteProjectCategoryModalProvider>
  );
};
