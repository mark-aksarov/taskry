import { NewSubtaskForm } from "../NewSubtaskForm";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewSubtaskModalTrigger } from "./NewSubtaskModalTrigger";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewSubtaskFormStory } from "../NewSubtaskForm/NewSubtaskForm.stories";

const meta = {
  title: "components/subtasks/NewSubtaskModalTrigger",
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
    newSubtaskForm: <NewSubtaskForm {...NewSubtaskFormStory.args} />,
  },
} satisfies Story;
