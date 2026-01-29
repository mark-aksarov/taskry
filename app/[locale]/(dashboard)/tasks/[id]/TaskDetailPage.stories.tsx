import {
  TaskDetailAlt,
  TaskDetailAltSkeleton,
} from "@/components/tasks/TaskDetailAlt";

import {
  Default as TaskDetailStory,
  WithoutSomeData as TaskDetailWithoutSomeDataStory,
} from "@/components/tasks/TaskDetail/TaskDetail.stories";

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
import { TaskDetailHeaderImage } from "@/components/tasks/TaskDetailHeaderImage";

const meta = {
  title: "components/pages/TaskDetailPage",
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
    taskHeaderContainer: (
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
    taskDetailContainer: <TaskDetailAltSkeleton />,
    taskHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    taskDetailContainer: (
      <TaskDetailAlt {...TaskDetailWithoutSomeDataStory.args} />
    ),
    taskHeaderContainer: <DetailHeaderSkeleton />,
  },
} satisfies Story;
