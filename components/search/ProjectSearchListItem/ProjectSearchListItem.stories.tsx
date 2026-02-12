import type { Meta, StoryObj } from "@storybook/react";
import { ProjectSearchListItem } from "./ProjectSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/search/ProjectSearchListItem",
  component: ProjectSearchListItem,
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectSearchListItem>;

export default meta;
type Story = StoryObj<typeof ProjectSearchListItem>;

export const Default = {
  args: {
    id: 1,
    title: "Website Redesign",
    deadline: new Date("2025-06-30"),
  },
} satisfies Story;
