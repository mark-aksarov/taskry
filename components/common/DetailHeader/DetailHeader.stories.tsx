import { DetailHeader } from "./DetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailHeaderImage } from "@/components/tasks/TaskDetailHeaderImage";

const meta = {
  title: "components/common/DetailHeader",
  component: DetailHeader,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof DetailHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: "Design landing page",
    image: <TaskDetailHeaderImage />,
    subtitle: "Design",
  },
} satisfies Story;
