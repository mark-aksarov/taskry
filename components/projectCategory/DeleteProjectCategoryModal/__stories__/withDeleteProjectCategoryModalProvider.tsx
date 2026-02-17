import { type Decorator } from "@storybook/react";
import { DeleteProjectCategoryModalProvider } from "..";

export const withDeleteProjectCategoryModalProvider: Decorator = (Story) => {
  return (
    <DeleteProjectCategoryModalProvider
      deleteEntity={() => ({ status: "success" })}
    >
      <Story />
    </DeleteProjectCategoryModalProvider>
  );
};
