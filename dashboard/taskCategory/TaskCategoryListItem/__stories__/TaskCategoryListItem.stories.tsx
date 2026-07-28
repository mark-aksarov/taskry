import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryListItem } from "../TaskCategoryListItem";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { UpdateTaskCategoryProvider } from "../../UpdateTaskCategoryContext";
import { DeleteTaskCategoryProvider } from "../../DeleteTaskCategoryContext";
import { DeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/task-categories/TaskCategoryListItem",
  component: TaskCategoryListItem,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <UpdateTaskCategoryProvider>
          <DeleteTaskCategoryProvider>
            <DeleteTaskCategoriesProvider>
              <Story />
            </DeleteTaskCategoriesProvider>
          </DeleteTaskCategoryProvider>
        </UpdateTaskCategoryProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof TaskCategoryListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    name: "Task Category 1",
  },
} satisfies Story;
