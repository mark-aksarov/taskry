import {
  TaskDetailCardHeader,
  TaskDetailCardHeaderSkeleton,
} from "./TaskDetailCardHeader";

import { subDays } from "date-fns";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeleteTaskProvider } from "../DeleteTaskContext";
import { UpdateTaskTitleProvider } from "../UpdateTaskTitleContext";
import { DeadlineProvider } from "@/dashboard/common/DeadlineContext";
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

type PropsAndDeadlineArgs = React.ComponentProps<typeof TaskDetailCard> & {
  deadline: string;
};

const meta = {
  title: "dashboard/tasks/TaskDetailCard",
  component: TaskDetailCard,
  render: (args) => (
    <DeadlineProvider deadline={args.deadline} status={mockedTaskDetail.status}>
      <TaskDetailCard {...args} />
    </DeadlineProvider>
  ),
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
} satisfies Meta<PropsAndDeadlineArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetailCardHeaderContainer: (
      <TaskDetailCardHeader taskStatus={mockedTaskDetail.status} />
    ),
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        progress={75}
        subtasksList={<SubtaskListExample variant="rich" showActionMenu />}
      />
    ),
    deadline: mockedTaskDetail.deadline,
  },
} satisfies Story;

export const WithOverdueDeadline = {
  args: {
    ...Default.args,
    taskDetailContainer: <TaskDetailAlt {...mockedTaskDetail} progress={75} />,
    deadline: subDays(new Date(), 3).toISOString(),
  },
} satisfies Story;

export const WithSkeleton = {
  args: {
    taskDetailCardHeaderContainer: <TaskDetailCardHeaderSkeleton />,
    taskDetailContainer: <TaskDetailAltSkeleton />,
    deadline: mockedTaskDetail.deadline,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    taskDetailContainer: (
      <TaskDetailAlt
        title={mockedTaskDetail.title}
        status={mockedTaskDetail.status}
        progress={0}
      />
    ),
  },
} satisfies Story;
