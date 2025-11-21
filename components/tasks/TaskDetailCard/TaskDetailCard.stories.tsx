import { TaskDetailCard } from "./TaskDetailCard";
import { TaskDetailForm, TaskDetailFormSkeleton } from "../TaskDetailForm";
import { TaskDetailFull, TaskDetailFullSkeleton } from "../TaskDetailFull";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  DetailCardHeading,
  DetailCardHeadingSkeleton,
} from "@/components/common/DetailCard";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskDetailFormStory } from "../TaskDetailForm/TaskDetailForm.stories";
import { Default as TaskDetailFullStory } from "../TaskDetailFull/TaskDetailFull.stories";

const meta = {
  title: "Components/tasks/TaskDetailCard",
  component: TaskDetailCard,
  decorators: [withThemedBackground],
} satisfies Meta<typeof TaskDetailCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    taskDetailCardHeading: (
      <DetailCardHeading>Design homepage layout</DetailCardHeading>
    ),
    taskDetail: <TaskDetailFull {...TaskDetailFullStory.args} />,
    taskDetailForm: <TaskDetailForm {...TaskDetailFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    taskDetailCardHeading: <DetailCardHeadingSkeleton />,
    taskDetail: <TaskDetailFullSkeleton />,
    taskDetailForm: <TaskDetailFormSkeleton />,
  },
} satisfies Story;
