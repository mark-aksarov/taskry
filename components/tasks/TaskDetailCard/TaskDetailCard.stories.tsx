import { TaskDetailCard } from "./TaskDetailCard";
import { TaskDetailForm } from "../TaskDetailForm";
import { TaskDetailFull } from "../TaskDetailFull";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DetailCardHeading } from "@/components/common/DetailCard";
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
