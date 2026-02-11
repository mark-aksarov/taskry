import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewProjectCategoryFormStory } from "../NewProjectCategoryForm/NewProjectCategoryForm.stories";

const meta = {
  title: "Components/project-categories/NewProjectCategoryModal",
  component: NewProjectCategoryModal,
  tags: ["autodocs"],
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
