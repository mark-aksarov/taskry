import { Button } from "@/components/ui/Button";
import { NewProjectForm } from "../NewProjectForm";
import { NewProjectModal } from "./NewProjectModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewProjectFormStory } from "../NewProjectForm/NewProjectForm.stories";

const meta = {
  title: "Components/projects/NewProjectModal",
  component: NewProjectModal,
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
