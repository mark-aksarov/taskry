import { Button } from "@/components/ui/Button";
import { NewProjectForm } from "../NewProjectForm";
import { NewProjectModal } from "./NewProjectModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { NewProjectFormStory } from "../NewProjectForm/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/NewProjectModal",
  component: NewProjectModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New project" />
        <Story />
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewProjectModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newProjectFormContainer: <NewProjectForm {...NewProjectFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
