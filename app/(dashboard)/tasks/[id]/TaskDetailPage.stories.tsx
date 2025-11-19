import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { TaskDetailPage } from "./TaskDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetail, TaskDetailSkeleton } from "@/components/tasks/TaskDetail";
import { Default as TaskDetailStory } from "@/components/tasks/TaskDetail/TaskDetail.stories";

const meta = {
  title: "components/pages/TaskDetailPage",
  component: TaskDetailPage,
  parameters: { layout: "fullscreen" },
  decorators: [PageDecorator, withThemedBackground],
  beforeEach: () => {
    mocked(usePathname).mockReturnValue("/tasks/1");
  },
  args: {
    id: 1,
  },
} satisfies Meta<typeof TaskDetailPage>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    TaskDetailContainer: () => <TaskDetail {...TaskDetailStory.args} />,
  },
} satisfies Story;

export const Loading = {
  args: {
    TaskDetailContainer: () => <TaskDetailSkeleton />,
  },
} satisfies Story;
