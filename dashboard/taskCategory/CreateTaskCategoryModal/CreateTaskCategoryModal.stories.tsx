import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CreateTaskCategoryModal } from "../CreateTaskCategoryModal";
import { CreateTaskCategoryProvider } from "../CreateTaskCategoryContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/task-categories/CreateTaskCategoryModal",
  component: CreateTaskCategoryModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateTaskCategoryProvider>
        <Story />
      </CreateTaskCategoryProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "createTaskCategory",
  },
} satisfies Meta<typeof CreateTaskCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {},
} satisfies Story;
