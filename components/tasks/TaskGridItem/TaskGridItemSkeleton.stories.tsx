import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGridItemSkeleton } from "./TaskGridItemSkeleton";
import {
  withBackgroundVariant,
  withContainerWidth,
} from "@/.storybook/decorators";

const meta = {
  title: "Components/tasks/TaskGridItemSkeleton",
  component: TaskGridItemSkeleton,
  decorators: [withContainerWidth("250px"), withBackgroundVariant()],
} satisfies Meta<typeof TaskGridItemSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
