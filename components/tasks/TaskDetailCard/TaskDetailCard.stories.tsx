import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailActions } from "../TaskDetailActions";
import { TaskDetailStory } from "../TaskDetail/__stories__";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailWithoutSomeDataStory } from "../TaskDetail/__stories__";
import { TaskDetailHeaderStory } from "@/components/common/DetailHeader/__stories__";
import { TaskDetailActionsStory } from "@/components/tasks/TaskDetailActions/__stories__";

const meta = {
  title: "components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetail: <TaskDetailAlt {...TaskDetailStory.args} />,
    taskDetailHeader: <DetailHeader {...TaskDetailHeaderStory.args} />,
    taskDetailActions: <TaskDetailActions {...TaskDetailActionsStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    taskDetail: <TaskDetailAltSkeleton />,
    taskDetailHeader: <DetailHeaderSkeleton />,
    taskDetailActions: <TaskDetailActions {...TaskDetailActionsStory.args} />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    taskDetail: <TaskDetailAlt {...TaskDetailWithoutSomeDataStory.args} />,
  },
} satisfies Story;
