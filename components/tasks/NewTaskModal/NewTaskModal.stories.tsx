import { Suspense } from "react";
import { NewTaskModal } from "./NewTaskModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewTaskForm, NewTaskFormSkeleton } from "../NewTaskForm";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewTaskFormStory } from "../NewTaskForm/NewTaskForm.stories";

const meta = {
  title: "Components/tasks/NewTaskModal",
  component: NewTaskModal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <RACDialogTrigger>
        <Button label="New task" />
        <Suspense>
          <Story />
        </Suspense>
      </RACDialogTrigger>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof NewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskForm: <NewTaskForm {...NewTaskFormStory.args} />,
  },
} satisfies Story;

export const Skeleton = {
  args: {
    newTaskForm: <NewTaskFormSkeleton />,
  },
} satisfies Story;
