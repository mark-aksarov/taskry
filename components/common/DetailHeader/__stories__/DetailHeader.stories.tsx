import { DetailHeader } from "../DetailHeader";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PersonDetailHeaderImage } from "../../PersonDetailHeaderImage";
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
    title: "Task 1",
    image: <TaskDetailHeaderImage />,
    subtitle: "Category 1",
  },
} satisfies Story;

export const ProjectDetailHeader = {
  args: {
    title: "Project 1",
    image: <ProjectDetailHeaderImage />,
    subtitle: "Category 1",
  },
} satisfies Story;

export const PersonDetailHeader = {
  args: {
    title: "User 1",
    image: <PersonDetailHeaderImage imageUrl="/man.jpg" alt="User 1" />,
    subtitle: "Position 1",
  },
} satisfies Story;
