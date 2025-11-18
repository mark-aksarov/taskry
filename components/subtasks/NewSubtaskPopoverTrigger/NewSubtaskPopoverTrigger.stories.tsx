import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewSubtaskPopoverTrigger } from "./NewSubtaskPopoverTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/NewSubtaskPopoverTrigger",
  component: NewSubtaskPopoverTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewSubtaskPopoverTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
