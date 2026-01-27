import { fn } from "storybook/internal/test";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryFormBaseSkeleton } from "../ProjectCategoryFormBase";

const meta = {
  title: "Components/projects/NewProjectCategoryModal",
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
    newProjectCategoryForm: <NewProjectCategoryForm formAction={fn()} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectCategoryForm: <ProjectCategoryFormBaseSkeleton />,
  },
} satisfies Story;
