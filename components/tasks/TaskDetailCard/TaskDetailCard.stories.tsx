import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";
import { WithoutSomeData as TaskDetailWithoutSomeDataStory } from "../TaskDetail/TaskDetail.stories";
import { TaskDetailHeader as TaskDetailHeaderStory } from "@/components/common/DetailHeader/DetailHeader.stories";

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
  },
} satisfies Story;

export const Loading = {
  args: {
    taskDetail: <TaskDetailAltSkeleton />,
    taskDetailHeader: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    ...Default.args,
    taskDetail: <TaskDetailAlt {...TaskDetailWithoutSomeDataStory.args} />,
  },
} satisfies Story;
