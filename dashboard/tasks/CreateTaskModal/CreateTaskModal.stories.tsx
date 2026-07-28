import { CreateTaskForm } from "../CreateTaskForm";
import { CreateTaskModal } from "./CreateTaskModal";
import { mockedUserSummaries } from "@/mocks/users";
import { withOpenModal } from "@/.storybook/withOpenModal";
import { TaskFormSkeleton } from "../TaskFormSkeleton";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { CreateTaskProvider } from "../CreateTaskContext";
import { mockedTaskCategorySummaries } from "@/mocks/taskCategories";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/CreateTaskModal",
  component: CreateTaskModal,
  decorators: [
    withOpenModal,
    (Story) => (
      <CreateTaskProvider>
        <Story />
      </CreateTaskProvider>
    ),
    withDashboardLayoutProviders,
  ],
  parameters: {
    modalId: "createTask",
  },
} satisfies Meta<typeof CreateTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    createTaskFormContainer: (
      <CreateTaskForm
        categorySelectItems={mockedTaskCategorySummaries}
        projectSelectItems={mockedProjectSummaries}
        assigneeSelectItems={mockedUserSummaries}
      />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    createTaskFormContainer: <TaskFormSkeleton />,
  },
} satisfies Story;
