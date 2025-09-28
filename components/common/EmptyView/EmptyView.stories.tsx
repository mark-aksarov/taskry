import { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  EmptyView,
  EmptyViewDescription,
  EmptyViewLink,
  EmptyViewTitle,
} from "./EmptyView";

const meta = {
  title: "Components/common/EmptyView",
  component: EmptyView,
  tags: ["autodocs"],
  render: (args) => (
    <EmptyView {...args}>
      <EmptyViewTitle>No tasks yet</EmptyViewTitle>
      <EmptyViewDescription>
        Create a new task to keep track of your work
      </EmptyViewDescription>
      <EmptyViewLink href="#">New Task</EmptyViewLink>
    </EmptyView>
  ),
} satisfies Meta<typeof EmptyView>;

export default meta;
type Story = StoryObj<typeof EmptyView>;

export const Default: Story = {};
