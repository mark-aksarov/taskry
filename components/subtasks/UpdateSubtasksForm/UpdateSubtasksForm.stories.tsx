import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtasksForm } from "./UpdateSubtasksForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/UpdateSubtasksForm",
  component: UpdateSubtasksForm,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof UpdateSubtasksForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    initialSubtasks: [
      {
        id: 1,
        text: "Set up project structure",
        isDone: true,
      },
      {
        id: 2,
        text: "Configure server environment",
        isDone: false,
      },
    ],
  },
} satisfies Story;
