import {
  UpdateTaskCategoryRelForm,
  UpdateTaskCategoryRelFormSkeleton,
} from "../UpdateTaskCategoryRelForm";

import { withOpenModal } from "@/.storybook/withOpenModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { UpdateTaskCategoryRelModal } from "./UpdateTaskCategoryRelModal";
import { UpdateTaskCategoryRelProvider } from "../UpdateTaskCategoryRelContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/UpdateTaskCategoryRelModal",
  component: UpdateTaskCategoryRelModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <UpdateTaskCategoryRelProvider>
        <Story />
      </UpdateTaskCategoryRelProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "updateTaskCategoryRel",
  },
} satisfies Meta<typeof UpdateTaskCategoryRelModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateTaskCategoryRelFormContainer: (
      <UpdateTaskCategoryRelForm
        taskId={mockedTask.id}
        categoryId={mockedTask.category.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateTaskCategoryRelFormContainer: <UpdateTaskCategoryRelFormSkeleton />,
  },
} satisfies Story;
