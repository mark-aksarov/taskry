import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteTaskCategoryModal } from "./DeleteTaskCategoryModal";
import { DeleteTaskCategoryProvider } from "../DeleteTaskCategoryContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { SelectedItemsProvider } from "@/dashboard/common/SelectedItemsContext";

const meta = {
  title: "dashboard/task-categories/DeleteTaskCategoryModal",
  component: DeleteTaskCategoryModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <SelectedItemsProvider pageItems={[]}>
        <DeleteTaskCategoryProvider>
          <Story />
        </DeleteTaskCategoryProvider>
      </SelectedItemsProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "deleteTaskCategory",
  },
} satisfies Meta<typeof DeleteTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Fake task category",
  },
} satisfies Story;
