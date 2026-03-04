import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailCard } from "./TaskDetailCard";
import { TaskDetailHeader } from "../TaskDetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailActions } from "../TaskDetailActions";
import { taskDetailAltArgs } from "../TaskDetailAlt/__stories__";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { taskDetailActionsArgs } from "../TaskDetailActions/__stories__";

const meta = {
  title: "components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const task = mockedTaskDetail;

export const Default = {
  args: {
    taskDetailContainer: <TaskDetailAlt {...taskDetailAltArgs} />,
    taskDetailHeaderContainer: (
      <TaskDetailHeader
        taskTitle={task.title}
        categoryName={task.category?.name}
      />
    ),
    taskDetailActions: <TaskDetailActions {...taskDetailActionsArgs} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskDetailHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    taskDetailContainer: (
      <TaskDetailAlt
        id={task.id}
        project={task.project}
        deadline={task.deadline}
        status={task.status}
      />
    ),
    taskDetailHeaderContainer: <TaskDetailHeader taskTitle={task.title} />,
    taskDetailActions: <TaskDetailActions {...taskDetailActionsArgs} />,
  },
} satisfies Story;
