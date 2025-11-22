import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserTasksEmptySection } from "./UserTasksEmptySection";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/users/UserTasksEmptySection",
  component: UserTasksEmptySection,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
    layout: "centered",
  },
} satisfies Meta<typeof UserTasksEmptySection>;

export default meta;
export type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
