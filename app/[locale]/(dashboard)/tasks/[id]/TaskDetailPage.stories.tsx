import {
  TaskDetailAlt,
  TaskDetailAltSkeleton,
} from "@/components/tasks/TaskDetailAlt";

import {
  TaskDetailStory,
  TaskDetailWithoutSomeDataStory,
} from "@/components/tasks/TaskDetail/__stories__";

import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { TaskDetailPage } from "./TaskDetailPage";
import { mocked } from "storybook/test";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useParams, usePathname } from "next/navigation";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailActions } from "@/components/tasks/TaskDetailActions";
import { TaskDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { TaskDetailActionsStory } from "@/components/tasks/TaskDetailActions/__stories__";

const meta = {
  title: "pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/1");
    mocked(useParams).mockReturnValue({
      id: "1",
    });
  },
} satisfies Meta<typeof TaskDetailPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetailContainer: <TaskDetailAlt {...TaskDetailStory.args} />,
    taskHeaderContainer: <DetailHeader {...TaskDetailHeaderStory.args} />,
    taskDetailActions: <TaskDetailActions {...TaskDetailActionsStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskHeaderContainer: <DetailHeaderSkeleton />,
    taskDetailActions: <TaskDetailActions {...TaskDetailActionsStory.args} />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    taskDetailContainer: (
      <TaskDetailAlt {...TaskDetailWithoutSomeDataStory.args} />
    ),
    taskHeaderContainer: <DetailHeaderSkeleton />,
    taskDetailActions: <TaskDetailActions {...TaskDetailActionsStory.args} />,
  },
} satisfies Story;
