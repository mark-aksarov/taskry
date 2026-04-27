import {
  UpdateTaskCategoryRelForm,
  UpdateTaskCategoryRelFormSkeleton,
} from "../UpdateTaskCategoryRelForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { UpdateTaskCategoryRelModal } from "./UpdateTaskCategoryRelModal";
import { withUpdateTaskCategoryRelProvider } from "../UpdateTaskCategoryRelProvider/__stories__";

const meta = {
  title: "dashboard/tasks/UpdateTaskCategoryRelModal",
  component: UpdateTaskCategoryRelModal,
  decorators: [
    withOpenModal,
    withUpdateTaskCategoryRelProvider,
    withModalManagerProvider,
    withThemedBackground,
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
