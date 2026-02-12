import { EmptySection } from "./EmptySection";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptySectionButton } from "./EmptySectionButton";
import { EmptySectionHeading } from "./EmptySectionHeading";
import { NewTaskForm } from "@/components/tasks/NewTaskForm";
import { NewTaskModal } from "@/components/tasks/NewTaskModal";
import { EmptySectionDescription } from "./EmptySectionDescription";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { Default as NewTaskFormStory } from "@/components/tasks/NewTaskForm/NewTaskForm.stories";

const meta = {
  title: "Components/common/EmptySection",
  component: EmptySection,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
    layout: "centered",
  },
} satisfies Meta<typeof EmptySection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        <EmptySectionHeading>No tasks yet</EmptySectionHeading>
        <EmptySectionDescription>
          Create a new task to keep track of your work
        </EmptySectionDescription>
        <EmptySectionButton
          createNewModal={
            <NewTaskModal
              newTaskFormContainer={<NewTaskForm {...NewTaskFormStory.args} />}
            />
          }
        >
          New Task
        </EmptySectionButton>
      </>
    ),
  },
} satisfies Story;
