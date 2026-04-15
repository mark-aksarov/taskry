import { mocked } from "storybook/test";
import AppTaskDetailLoading from "./loading";
import { mockedTaskDetail } from "@/mocks/tasks";
import { TaskDetailPage } from "./TaskDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { SubtaskList } from "@/components/subtasks/SubtaskList";
import { TaskDetailAlt } from "@/components/tasks/TaskDetailAlt";
import { SharedPageDecorator } from "@/.storybook/SharedPageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { SubtaskListStory } from "@/components/subtasks/SubtaskList/__stories__";
import { withTaskSearchModal } from "@/components/tasks/TaskSearchModal/__stories__";
import { withCreateSubtaskProvider } from "@/components/subtasks/CreateSubtaskProvider/__stories__";
import { withUpdateTaskTitleProvider } from "@/components/tasks/UpdateTaskTitleProvider/__stories__";
import { withUpdateTaskStatusProvider } from "@/components/tasks/UpdateTaskStatusProvider/__stories__";
import { withUpdateTaskProjectProvider } from "@/components/tasks/UpdateTaskProjectProvider/__stories__";
import { withUpdateTaskDeadlineProvider } from "@/components/tasks/UpdateTaskDeadlineProvider/__stories__";
import { withUpdateTaskAssigneeProvider } from "@/components/tasks/UpdateTaskAssigneeProvider/__stories__";
import { withUpdateTaskStatusAltProvider } from "@/components/tasks/UpdateTaskStatusAltProvider/__stories__";
import { withUpdateTaskDescriptionProvider } from "@/components/tasks/UpdateTaskDescriptionProvider/__stories__";
import { withUpdateTaskCategoryRelProvider } from "@/components/tasks/UpdateTaskCategoryRelProvider/__stories__";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [
    withTaskSearchModal,
    withUpdateTaskProjectProvider,
    withUpdateTaskCategoryRelProvider,
    withUpdateTaskAssigneeProvider,
    withUpdateTaskStatusAltProvider,
    withUpdateTaskDeadlineProvider,
    withUpdateTaskDescriptionProvider,
    withUpdateTaskTitleProvider,
    withUpdateTaskStatusProvider,
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
  },
} satisfies Story;

export const Loading = {
  args: { ...Default.args },
  render: () => <AppTaskDetailLoading />,
} satisfies Story;

export const WithoutOptionalTaskData = {
  args: {
    ...Default.args,
    taskDetailContainer: (
      <TaskDetailAlt
        title={mockedTaskDetail.title}
        deadline={mockedTaskDetail.deadline}
        status={mockedTaskDetail.status}
      />
    ),
  },
} satisfies Story;
