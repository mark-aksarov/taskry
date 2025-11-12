import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptySection } from "./EmptySection";
import { EmptySectionHeading } from "./EmptySectionHeading";
import { EmptySectionDescription } from "./EmptySectionDescription";
import { EmptySectionButton } from "./EmptySectionButton";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";

const meta = {
  title: "Components/common/EmptySection",
  component: EmptySection,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant({ variant: "alt" })],
} satisfies Meta<typeof EmptySection>;

export default meta;
type Story = StoryObj<typeof EmptySection>;

export const Default = {
  args: {
    children: (
      <>
        <EmptySectionHeading>No tasks yet</EmptySectionHeading>
        <EmptySectionDescription>
          Create a new task to keep track of your work
        </EmptySectionDescription>
        <EmptySectionButton href="#">New Task</EmptySectionButton>
      </>
    ),
  },
} satisfies Story;
