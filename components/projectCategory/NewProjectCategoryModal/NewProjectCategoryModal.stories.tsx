import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { NewProjectCategoryFormStory } from "../NewProjectCategoryForm/__stories__";

const meta = {
  title: "components/project-categories/NewProjectCategoryModal",
  component: NewProjectCategoryModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New project" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newProjectCategoryForm: (
      <NewProjectCategoryForm {...NewProjectCategoryFormStory.args} />
    ),
  },
} satisfies Story;
