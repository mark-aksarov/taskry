import { type Decorator } from "@storybook/react";
import { CreateProjectCategoryProvider } from "../../CreateProjectCategoryContext";

export const withCreateProjectCategoryProvider: Decorator = (Story) => {
  return (
    <CreateProjectCategoryProvider
      createProjectCategory={() => ({ status: "success" })}
    >
      <Story />
    </CreateProjectCategoryProvider>
  );
};
