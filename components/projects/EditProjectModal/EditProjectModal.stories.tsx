import { Button } from "@/components/ui/Button";
import { EditProjectForm } from "../EditProjectForm";
import { EditProjectModal } from "./EditProjectModal";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFormSkeleton } from "../ProjectFormSkeleton";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as EditProjectFormStory } from "../EditProjectForm/EditProjectForm.stories";

const meta = {
  title: "Components/projects/EditProjectModal",
  component: EditProjectModal,
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New project" />
        <Story />
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
      <EditProjectForm {...EditProjectFormStory.args} />
    ),
  },
} satisfies Story;

export const Skeleton = {
  args: {
    ...Default.args,
    editProjectFormContainer: <ProjectFormSkeleton />,
  },
} satisfies Story;
