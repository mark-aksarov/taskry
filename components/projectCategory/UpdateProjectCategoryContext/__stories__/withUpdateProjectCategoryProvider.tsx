import { type Decorator } from "@storybook/react";
import { UpdateProjectCategoryProvider } from "../UpdateProjectCategoryContext";

export const withUpdateProjectCategoryProvider: Decorator = (Story) => {
  return (
    <UpdateProjectCategoryProvider
      updateProjectCategory={() => ({ status: "success" })}
    >
      <Story />
    </UpdateProjectCategoryProvider>
  );
};
