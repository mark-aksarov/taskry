import { Suspense } from "react";
import { NewTaskModal } from "./NewTaskModal";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button, RACDialogTrigger } from "@/components/ui";
import { NewTaskForm } from "../NewTaskForm";
import { Default as NewTaskFormStory } from "../NewTaskForm/NewTaskForm.stories";
import { withBackgroundVariant } from "@/.storybook/decorators";

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
    withBackgroundVariant(),
  ],
} satisfies Meta<typeof NewTaskModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    newTaskForm: <NewTaskForm {...NewTaskFormStory.args} />,
  },
} satisfies Story;
