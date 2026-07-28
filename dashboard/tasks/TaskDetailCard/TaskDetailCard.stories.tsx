import {
  TaskDetailCardHeader,
  TaskDetailCardHeaderSkeleton,
} from "./TaskDetailCardHeader";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteTaskProvider } from "../DeleteTaskContext";
import { UpdateTaskTitleProvider } from "../UpdateTaskTitleContext";
import { UpdateTaskStatusProvider } from "../UpdateTaskStatusContext";
import { UpdateTaskProjectProvider } from "../UpdateTaskProjectContext";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { UpdateTaskAssigneeProvider } from "../UpdateTaskAssigneeContext";
import { UpdateTaskDeadlineProvider } from "../UpdateTaskDeadlineContext";
import { UpdateTaskStatusAltProvider } from "../UpdateTaskStatusAltContext";
import { UpdateTaskCategoryRelProvider } from "../UpdateTaskCategoryRelContext";
import { UpdateTaskDescriptionProvider } from "../UpdateTaskDescriptionContext";
import { SubtaskListExample } from "@/dashboard/subtasks/SubtaskList/__stories__";
import { CreateSubtaskProvider } from "@/dashboard/subtasks/CreateSubtaskContext";
import { withDashboardLayoutProviders } from "@/.storybook/withDashboardLayoutProviders";

const meta = {
  title: "dashboard/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [
    (Story) => (
      <CreateSubtaskProvider>
        <UpdateTaskStatusProvider>
          <UpdateTaskTitleProvider>
            <UpdateTaskDescriptionProvider>
              <UpdateTaskDeadlineProvider>
                <UpdateTaskStatusAltProvider>
                  <UpdateTaskAssigneeProvider>
                    <UpdateTaskCategoryRelProvider>
                      <UpdateTaskProjectProvider>
                        <DeleteTaskProvider>
                          <Story />
                        </DeleteTaskProvider>
                      </UpdateTaskProjectProvider>
                    </UpdateTaskCategoryRelProvider>
                  </UpdateTaskAssigneeProvider>
                </UpdateTaskStatusAltProvider>
              </UpdateTaskDeadlineProvider>
            </UpdateTaskDescriptionProvider>
          </UpdateTaskTitleProvider>
        </UpdateTaskStatusProvider>
      </CreateSubtaskProvider>
    ),

    withDashboardLayoutProviders,
  ],
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetailCardHeaderContainer: (
      <TaskDetailCardHeader
        taskStatus={mockedTaskDetail.status}
        taskDeadline={mockedTaskDetail.deadline}
      />
    ),
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        progress={75}
        subtasksList={<SubtaskListExample variant="rich" showActionMenu />}
      />
    ),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    taskDetailCardHeaderContainer: <TaskDetailCardHeaderSkeleton />,
    taskDetailContainer: <TaskDetailAltSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    taskDetailContainer: (
      <TaskDetailAlt
        title={mockedTaskDetail.title}
        deadline={mockedTaskDetail.deadline}
        status={mockedTaskDetail.status}
        progress={0}
      />
    ),
  },
} satisfies Story;
