import { fn } from "storybook/test";
import { UserTaskListItem } from "./UserTaskListItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserTaskListItem",
  component: UserTaskListItem,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof UserTaskListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
    commentsCount: 10,
    status: "pending",
    projectStatus: "pending",
    deleteAction: fn(),
    updateStatusAction: fn(),
  },
} satisfies Story;
