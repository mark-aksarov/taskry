import { Suspense } from "react";
import { NewProjectModal } from "./NewProjectModal";
import { ProjectFormBase } from "../ProjectFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { ProjectFormBaseSkeleton } from "../ProjectFormBase";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectFormBaseStory } from "../ProjectFormBase/ProjectFormBase.stories";

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
    newProjectFormContainer: <ProjectFormBase {...ProjectFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectFormContainer: <ProjectFormBaseSkeleton />,
  },
} satisfies Story;
