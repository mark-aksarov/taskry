import { ProjectDetail } from "../ProjectDetail";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectDetail",
  component: ProjectDetail,
  decorators: [withThemedBackground],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Project 1",
    creator: {
      id: "1",
      fullName: "User 1",
      imageUrl: "/man.jpg",
    },
    deadline: new Date("2025-01-01"),
    description: "Project description. General information goes here.",
    customer: {
      id: 2,
      fullName: "User 2",
      imageUrl: "/woman.jpg",
    },
    category: {
      id: 1,
      name: "Category 1",
    },
    status: "pending",
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    id: 2,
    title: "Project 1",
    deadline: new Date("2025-01-01"),
    status: "pending",
  },
} satisfies Story;
