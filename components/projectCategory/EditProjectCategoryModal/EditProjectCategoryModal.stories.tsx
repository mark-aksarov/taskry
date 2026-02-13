import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EditProjectCategoryForm } from "../EditProjectCategoryForm";
import { EditProjectCategoryModal } from "./EditProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { EditProjectCategoryFormStory } from "../EditProjectCategoryForm/__stories__";

const meta = {
  title: "components/project-categories/EditProjectCategoryModal",
  component: EditProjectCategoryModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="Edit project" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editProjectCategoryForm: (
      <EditProjectCategoryForm {...EditProjectCategoryFormStory.args} />
    ),
  },
} satisfies Story;
