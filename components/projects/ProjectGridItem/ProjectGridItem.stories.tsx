import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectGridItem } from "./ProjectGridItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "Components/projects/ProjectGridItem",
  component: ProjectGridItem,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
} satisfies Meta<typeof ProjectGridItem>;

export default meta;
type Story = StoryObj<typeof ProjectGridItem>;

export const Default = {
  args: {
    project: {
      id: 1,
      title: "Website Revamp",
      deadline: new Date("2025-06-25"),
      creator: { id: "user1", fullName: "Liam Turner", imageUrl: "/man.jpg" },
      tasks: [
        { statusId: 1 },
        { statusId: 1 },
        { statusId: 2 },
        { statusId: 3 },
      ],
    },
  },
} satisfies Story;

export const Skeleton = {
  args: {
    project: undefined,
  },
} satisfies Story;

export const WithoutCreator = {
  args: {
    project: {
      ...Default.args.project,
      creator: null,
    },
  },
} satisfies Story;
