import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import { EditProjectModal } from "./EditProjectModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectFormBase, ProjectFormBaseSkeleton } from "../ProjectFormBase";
import { Default as ProjectFormBaseStory } from "../ProjectFormBase/ProjectFormBase.stories";

const meta = {
  title: "Components/projects/EditProjectModal",
  component: EditProjectModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New project" />
        <Suspense>
          <Story />
        </Suspense>
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof EditProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    editProjectFormContainer: (
      <ProjectFormBase {...ProjectFormBaseStory.args} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    editProjectFormContainer: <ProjectFormBaseSkeleton />,
  },
} satisfies Story;
