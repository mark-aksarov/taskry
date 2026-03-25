import { type Decorator } from "@storybook/react";
import { MockedSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { CreateProjectCategoryModalProvider } from "@/components/projectCategory/CreateProjectCategoryModal";
import { MockedCreateProjectCategoryProvider } from "@/components/projectCategory/CreateProjectCategoryProvider/__stories__";
import { MockedDeleteProjectCategoriesProvider } from "@/components/projectCategory/DeleteProjectCategoriesProvider/__stories__";

export const ProjectCategoriesPageDecorator: Decorator = (Story) => {
  return (
    <MockedSelectedItemsProvider>
      <MockedDeleteProjectCategoriesProvider>
        <CreateProjectCategoryModalProvider>
          <MockedCreateProjectCategoryProvider>
            <Story />
          </MockedCreateProjectCategoryProvider>
        </CreateProjectCategoryModalProvider>
      </MockedDeleteProjectCategoriesProvider>
    </MockedSelectedItemsProvider>
  );
};
