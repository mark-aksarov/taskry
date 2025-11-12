import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SubtaskTextField } from "./SubtaskTextField";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/SubtaskTextField",
  component: SubtaskTextField,
  tags: ["autodocs"],
  args: {
    label: "Name of subtask 1 ",
    placeholder: "Type a subtask name",
    actionButton: (
      <Button
        iconLeft={<X size={16} strokeWidth={1.5} absoluteStrokeWidth />}
        variant="ghost"
        className="rounded-full"
      />
    ),
  },
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskTextField>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
