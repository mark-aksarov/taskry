import {
  UpdateTaskProjectForm,
  UpdateTaskProjectFormSkeleton,
} from "../UpdateTaskProjectForm";

import {
  withOpenModal,
  withModalManagerProvider,
} from "@/dashboard/common/ModalManagerContext/__stories__";

import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { mockedProjectSummaries } from "@/mocks/projects";
import { mockedTaskDetail as mockedTask } from "@/mocks/tasks";
import { UpdateTaskProjectModal } from "./UpdateTaskProjectModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withUpdateTaskProjectProvider } from "../UpdateTaskProjectProvider/__stories__";

const meta = {
  title: "components/tasks/UpdateTaskProjectModal",
  component: UpdateTaskProjectModal,
  decorators: [
    withOpenModal,
    withUpdateTaskProjectProvider,
    withModalManagerProvider,
    withThemedBackground,
  ],
  parameters: {
    modalId: "updateTaskProject",
  },
} satisfies Meta<typeof UpdateTaskProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    updateTaskProjectFormContainer: (
      <UpdateTaskProjectForm
        taskId={mockedTask.id}
        projectId={mockedTask.project.id}
        projectSelectItems={mockedProjectSummaries}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    updateTaskProjectFormContainer: <UpdateTaskProjectFormSkeleton />,
  },
} satisfies Story;
