import {
  DetailHeader,
  DetailHeaderSkeleton,
} from "@/components/common/DetailHeader";

import { TaskDetailCard } from "./TaskDetailCard";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailHeaderImage } from "../TaskDetailHeaderImage";
import { TaskDetailAlt, TaskDetailAltSkeleton } from "../TaskDetailAlt";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailStory } from "../TaskDetail/TaskDetail.stories";
import { WithoutSomeData as TaskDetailWithoutSomeDataStory } from "../TaskDetail/TaskDetail.stories";

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
    taskDetailHeader: (
      <DetailHeader
        title={TaskDetailStory.args.title}
        image={<TaskDetailHeaderImage />}
        subtitle={TaskDetailStory.args.category.name}
      />
    ),
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
