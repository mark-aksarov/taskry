import { Suspense } from "react";
import { NewProjectModal } from "./NewProjectModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewProjectForm, NewProjectFormSkeleton } from "../NewProjectForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewProjectFormStory } from "../NewProjectForm/NewProjectForm.stories";

const meta = {
  title: "Components/projects/NewProjectModal",
  component: NewProjectModal,
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
} satisfies Meta<typeof NewProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newProjectForm: <NewProjectForm {...NewProjectFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectForm: <NewProjectFormSkeleton />,
  },
} satisfies Story;
