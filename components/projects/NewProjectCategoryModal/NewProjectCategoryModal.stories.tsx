import { Suspense } from "react";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewProjectCategoryForm } from "../NewProjectCategoryForm";
import { NewProjectCategoryModal } from "./NewProjectCategoryModal";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectCategoryFormBaseSkeleton } from "../ProjectCategoryFormBase";
import { Default as ProjectFormBaseStory } from "../ProjectFormBase/ProjectFormBase.stories";

const meta = {
  title: "Components/projects/NewProjectCategoryModal",
  component: NewProjectCategoryModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="New project" />
        <Suspense>
          <Story />
        </Suspense>
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewProjectCategoryModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newProjectCategoryForm: (
      <NewProjectCategoryForm {...ProjectFormBaseStory.args} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectCategoryForm: <ProjectCategoryFormBaseSkeleton />,
  },
} satisfies Story;
