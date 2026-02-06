import { DetailHeader } from "./DetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PersonDetailHeaderImage } from "../PersonDetailHeaderImage";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { TaskDetailHeaderImage } from "@/components/tasks/TaskDetailHeaderImage";
import { ProjectDetailHeaderImage } from "@/components/projects/ProjectDetailHeaderImage";

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

export const TaskDetailHeader = {
  args: {
    title: "Design homepage layout",
    image: <TaskDetailHeaderImage />,
    subtitle: "Design",
  },
} satisfies Story;

export const ProjectDetailHeader = {
  args: {
    title: "Website Redesign",
    image: <ProjectDetailHeaderImage />,
    subtitle: "Design",
  },
} satisfies Story;

export const PersonDetailHeader = {
  args: {
    title: "John Doe",
    image: <PersonDetailHeaderImage imageUrl="/man.jpg" alt="John Doe" />,
    subtitle: "Developer",
  },
} satisfies Story;
