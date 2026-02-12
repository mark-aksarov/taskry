import { ProjectDetail } from "./ProjectDetail";
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
    title: "Website Redesign",
    creator: {
      id: "u1",
      fullName: "Liam Anderson",
      imageUrl: "/man.jpg",
    },
    deadline: new Date("2025-12-01"),
    description:
      "A complete redesign of the client’s website with improved UX, SEO, and performance.",
    customer: {
      id: 1,
      fullName: "Emma Thompson",
      imageUrl: "/woman.jpg",
    },
    category: {
      id: 10,
      name: "Design",
    },
    status: "pending",
    attachments: [
      {
        id: 1,
        fileUrl: "/placeholder.jpg",
        fileName: "placeholder.jpg",
      },
      {
        id: 2,
        fileUrl: "/placeholder.jpg",
        fileName: "placeholder.jpg",
      },
    ],
  },
} satisfies Story;

export const WithoutSomeData = {
  args: {
    id: 2,
    title: "Website Redesign",
    deadline: new Date("2025-12-01"),
    status: "pending",
    attachments: [],
  },
} satisfies Story;
