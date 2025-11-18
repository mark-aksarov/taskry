import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewSubtaskForm } from "./NewSubtaskForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/NewSubtaskForm",
  component: NewSubtaskForm,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof NewSubtaskForm>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
