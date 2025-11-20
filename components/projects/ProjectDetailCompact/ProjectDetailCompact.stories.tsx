import { ProjectDetailCompact } from "./ProjectDetailCompact";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/projects/ProjectDetailCompact",
  component: ProjectDetailCompact,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="max-w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof ProjectDetailCompact>;

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
    status: {
      id: "pending",
      name: "Pending",
    },
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
    category: {
      id: 10,
      name: "Design",
    },
    status: {
      id: "pending",
      name: "Pending",
    },
    attachments: [],
  },
} satisfies Story;
