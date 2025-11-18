import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewSubtaskBottomSheetTrigger } from "./NewSubtaskBottomSheetTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/subtasks/NewSubtaskBottomSheetTrigger",
  component: NewSubtaskBottomSheetTrigger,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
  globals: {
    viewport: { value: "mobile2", isRotated: false },
  },
} satisfies Meta<typeof NewSubtaskBottomSheetTrigger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
