import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UpdateSubtasksForm } from "./UpdateSubtasksForm";

const meta = {
  title: "Components/subtasks/UpdateSubtasksForm",
  component: UpdateSubtasksForm,
  tags: ["autodocs"],
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
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-white p-4 dark:bg-gray-800">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UpdateSubtasksForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
