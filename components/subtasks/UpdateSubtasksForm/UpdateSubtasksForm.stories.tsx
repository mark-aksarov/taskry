import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtasksForm } from "./UpdateSubtasksForm";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";

const meta = {
  title: "Components/subtasks/UpdateSubtasksForm",
  component: UpdateSubtasksForm,
  tags: ["autodocs"],
  decorators: [withContainerWidth(), withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof UpdateSubtasksForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    initialSubtasks: [
      {
        id: 1,
        name: "Set up project structure",
        isDone: true,
      },
      {
        id: 2,
        name: "Configure server environment",
        isDone: false,
      },
    ],
  },
} satisfies Story;
