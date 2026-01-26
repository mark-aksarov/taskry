import { Button } from "@/components/ui/Button";
import { NewProjectModal } from "./NewProjectModal";
import { ProjectFormBase } from "../ProjectFormBase";
import { DialogTrigger } from "react-aria-components";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectFormBaseSkeleton } from "../ProjectFormBase";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as ProjectFormBaseStory } from "../ProjectFormBase/ProjectFormBase.stories";

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
    newProjectFormContainer: <ProjectFormBase {...ProjectFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newProjectFormContainer: <ProjectFormBaseSkeleton />,
  },
} satisfies Story;
