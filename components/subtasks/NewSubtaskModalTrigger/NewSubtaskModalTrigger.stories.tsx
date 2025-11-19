import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewSubtaskModalTrigger } from "./NewSubtaskModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/NewSubtaskModalTrigger",
  component: NewSubtaskModalTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewSubtaskModalTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
