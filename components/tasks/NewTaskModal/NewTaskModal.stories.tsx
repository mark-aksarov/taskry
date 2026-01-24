import { Suspense } from "react";
import { NewTaskForm } from "../NewTaskForm";
import { NewTaskModal } from "./NewTaskModal";
import { Button } from "@/components/ui/Button";
import { DialogTrigger } from "react-aria-components";
import { TaskFormBaseSkeleton } from "../TaskFormBase";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as TaskFormBaseStory } from "@/components/tasks/TaskFormBase/TaskFormBase.stories";

const meta = {
  title: "Components/tasks/NewTaskModal",
  component: NewTaskModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DialogTrigger>
        <Button label="New task" />
        <Suspense>
          <Story />
        </Suspense>
      </DialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskFormContainer: <NewTaskForm {...TaskFormBaseStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newTaskFormContainer: <TaskFormBaseSkeleton />,
  },
} satisfies Story;
