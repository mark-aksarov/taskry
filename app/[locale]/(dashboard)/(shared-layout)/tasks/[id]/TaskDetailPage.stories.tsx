import {
  TaskDetailAlt,
  TaskDetailAltSkeleton,
} from "@/components/tasks/TaskDetailAlt";

import { mocked } from "storybook/test";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailPage } from "./TaskDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { TaskDetailHeader } from "@/components/tasks/TaskDetailHeader";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { DetailHeaderSkeleton } from "@/components/common/DetailHeader";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withDeleteTaskProvider } from "@/components/tasks/DeleteTaskProvider/__stories__";
import { withUpdateTaskProvider } from "@/components/tasks/UpdateTaskProvider/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
import { withUpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider/__stories__";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withUpdateTaskStatusProvider,
    withUpdateTaskProvider,
    withDeleteTaskProvider,
    withCreateSubtaskProvider,
    SharedPageDecorator,
    withThemedBackground,
  ],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/1");
    mocked(useParams).mockReturnValue({
      id: mockedTaskDetail.id.toString(),
    });
  },
} satisfies Meta<typeof TaskDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetailContainer: (
      <TaskDetailAlt
        {...mockedTaskDetail}
        subtasksList={<SubtaskList {...SubtaskListStory.args} />}
      />
    ),
    taskHeaderContainer: (
      <TaskDetailHeader
        taskTitle={mockedTaskDetail.title}
        categoryName={mockedTaskDetail.category?.name}
      />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    ...Default.args,
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskHeaderContainer: (
      <TaskDetailHeader taskTitle={mockedTaskDetail.title} />
    ),
  },
} satisfies Story;
