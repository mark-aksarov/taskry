import { TaskCategoryGrid } from "../TaskCategoryGrid";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCategoryGridExample } from "./TaskCategoryGridExample";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { DeleteTaskCategoriesProvider } from "../../DeleteTaskCategoriesContext";

const meta = {
  title: "dashboard/task-categories/TaskCategoryGrid",
  component: TaskCategoryGrid,
  decorators: [
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteTaskCategoriesProvider>
          <Story />
        </DeleteTaskCategoriesProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof TaskCategoryGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: <TaskCategoryGridExample />,
  },
} satisfies Story;
