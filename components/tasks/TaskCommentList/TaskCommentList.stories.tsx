import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskCommentList } from "./TaskCommentList";
import { Suspense } from "react";
import { getUnreadTaskComments } from "@/lib/queries/task";
import { mocked } from "storybook/test";
import { mockedTaskComments } from "./mockedTaskComments";

const meta = {
  title: "Components/tasks/TaskCommentList",
  component: TaskCommentList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Suspense>
        <Story />
      </Suspense>
    ),
  ],
  beforeEach: () => {
    mocked(getUnreadTaskComments).mockReturnValue(
      new Promise((res) => res(mockedTaskComments)),
    );
  },
} satisfies Meta<typeof TaskCommentList>;

export default meta;
type Story = StoryObj<typeof TaskCommentList>;

export const Default: Story = {};
