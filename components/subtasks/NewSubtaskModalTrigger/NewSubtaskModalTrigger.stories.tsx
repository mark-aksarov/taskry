import { NewSubtaskForm } from "../NewSubtaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewSubtaskModalTrigger } from "./NewSubtaskModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as SubtaskFormBaseStory } from "@/components/subtasks/SubtaskFormBase/SubtaskFormBase.stories";

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

export const Default = {
  args: {
    newSubtaskForm: <NewSubtaskForm {...SubtaskFormBaseStory.args} />,
  },
} satisfies Story;
