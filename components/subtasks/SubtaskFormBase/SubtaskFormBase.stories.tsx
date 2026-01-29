import { fn } from "storybook/internal/test";
import { SubtaskFormBase } from "./SubtaskFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OverlayTriggerStateContext } from "react-aria-components";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/SubtaskFormBase",
  component: SubtaskFormBase,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <OverlayTriggerStateContext.Provider value={{ close: fn() } as any}>
        <div className="w-[350px] max-w-full">
          <Story />
        </div>
      </OverlayTriggerStateContext.Provider>
    ),

    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof SubtaskFormBase>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: "new-subtask-form",
    taskId: 1,
    formAction: fn(),
  },
} satisfies Story;
