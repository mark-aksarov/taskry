import { NewSubtaskForm } from "../NewSubtaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewSubtaskBottomSheetTrigger } from "./NewSubtaskBottomSheetTrigger";
import { Default as SubtaskFormBaseStory } from "@/components/subtasks/SubtaskFormBase/SubtaskFormBase.stories";

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

export const Default = {
  args: {
    newSubtaskFormContainer: <NewSubtaskForm {...SubtaskFormBaseStory.args} />,
  },
} satisfies Story;
