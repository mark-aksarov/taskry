import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptySection } from "./EmptySection";
import { EmptySectionHeading } from "./EmptySectionHeading";
import { EmptySectionDescription } from "./EmptySectionDescription";
import { EmptySectionButton } from "./EmptySectionButton";

const meta = {
  title: "Components/common/EmptySection",
  component: EmptySection,
  tags: ["autodocs"],
  render: (args) => (
    <EmptySection {...args}>
      <EmptySectionHeading>No tasks yet</EmptySectionHeading>
      <EmptySectionDescription>
        Create a new task to keep track of your work
      </EmptySectionDescription>
      <EmptySectionButton href="#">New Task</EmptySectionButton>
    </EmptySection>
  ),
} satisfies Meta<typeof EmptySection>;

export default meta;
type Story = StoryObj<typeof EmptySection>;

export const Default: Story = {};
