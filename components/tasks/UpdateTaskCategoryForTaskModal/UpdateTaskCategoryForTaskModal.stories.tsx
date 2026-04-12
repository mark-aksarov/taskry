import {
  UpdateTaskCategoryForTaskForm,
  UpdateTaskCategoryForTaskFormSkeleton,
} from "../UpdateTaskCategoryForTaskForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/components/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskProvider } from "../UpdateTaskProvider/__stories__";
import { UpdateTaskCategoryForTaskModal } from "./UpdateTaskCategoryForTaskModal";

const meta = {
  title: "components/tasks/UpdateTaskCategoryForTaskModal",
  component: UpdateTaskCategoryForTaskModal,
  decorators: [
    withOpenModal,
    withUpdateTaskProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateTaskCategoryForTask",
  },
} satisfies Meta<typeof UpdateTaskCategoryForTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateTaskCategoryForTaskFormContainer: (
      <UpdateTaskCategoryForTaskForm
        taskId={mockedTask.id}
        categoryId={mockedTask.category.id}
        taskCategorySelectItems={mockedTaskCategorySummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateTaskCategoryForTaskFormContainer: (
      <UpdateTaskCategoryForTaskFormSkeleton />
    ),
  },
} satisfies Story;
