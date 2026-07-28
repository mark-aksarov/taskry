import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateTaskCategoryModal } from "./UpdateTaskCategoryModal";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";
import { UpdateTaskCategoryProvider } from "@/dashboard/taskCategory/UpdateTaskCategoryContext";

const meta = {
  title: "dashboard/task-categories/UpdateTaskCategoryModal",
  component: UpdateTaskCategoryModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskCategoryProvider>
        <Story />
      </UpdateTaskCategoryProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateTaskCategory",
  },
} satisfies Meta<typeof UpdateTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskCategoryId: 1,
    taskCategoryName: "Fake task Category",
  },
} satisfies Story;
