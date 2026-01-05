import {
  TaskDetailFull,
  TaskDetailFullSkeleton,
} from "@/components/tasks/TaskDetailFull";

import {
  DetailCardHeading,
  DetailCardHeadingSkeleton,
} from "@/components/common/DetailCard";

import { mocked } from "storybook/test";
import { usePathname } from "next/navigation";
import { TaskDetailPage } from "./TaskDetailPage";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PageDecorator } from "@/.storybook/PageDecorator";
import {
  TaskDetailForm,
  TaskDetailFormSkeleton,
} from "@/components/tasks/TaskDetailForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailFullStory } from "@/components/tasks/TaskDetailFull/TaskDetailFull.stories";
import { Default as TaskDetailFormStory } from "@/components/tasks/TaskDetailForm/TaskDetailForm.stories";

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
    TaskDetailCardHeadingContainer: () => (
      <DetailCardHeading>Design homepage layout</DetailCardHeading>
    ),
    TaskDetailContainer: () => <TaskDetailFull {...TaskDetailFullStory.args} />,
    TaskDetailFormContainer: () => (
      <TaskDetailForm {...TaskDetailFormStory.args} />
    ),
  },
} satisfies Story;

export const Loading = {
  args: {
    TaskDetailCardHeadingContainer: () => <DetailCardHeadingSkeleton />,
    TaskDetailContainer: () => <TaskDetailFullSkeleton />,
    TaskDetailFormContainer: () => <TaskDetailFormSkeleton />,
  },
} satisfies Story;
