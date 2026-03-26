import { type Decorator } from "@storybook/react";
import { MockedSelectedItemsProvider } from "@/components/common/SelectedItemsContext/__stories__";
import { CreateTaskCategoryModalProvider } from "@/components/taskCategory/CreateTaskCategoryModal";
import { MockedCreateTaskCategoryProvider } from "@/components/taskCategory/CreateTaskCategoryProvider/__stories__";
import { MockedDeleteTaskCategoriesProvider } from "@/components/taskCategory/DeleteTaskCategoriesProvider/__stories__";

export const TaskCategoriesPageDecorator: Decorator = (Story) => {
  return (
    <MockedSelectedItemsProvider>
      <MockedDeleteTaskCategoriesProvider>
        <CreateTaskCategoryModalProvider>
          <MockedCreateTaskCategoryProvider>
            <Story />
          </MockedCreateTaskCategoryProvider>
        </CreateTaskCategoryModalProvider>
      </MockedDeleteTaskCategoriesProvider>
    </MockedSelectedItemsProvider>
  );
};
