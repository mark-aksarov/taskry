import { TaskDetailCompact } from "./TaskDetailCompact";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "components/tasks/TaskDetailCompact",
  component: TaskDetailCompact,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px] max-w-full">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetailCompact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Design homepage layout",
    description:
      "Create a modern and responsive homepage layout for the new project. The design should include a hero section with a clear call-to-action, a features section highlighting the main benefits, a testimonials section, and a footer with all necessary links. Pay attention to typography, color schemes, and responsive behavior on both desktop and mobile devices. Ensure the design aligns with the overall branding guidelines and provides an intuitive user experience. Collaboration with the UX and content teams is required to finalize the layout and assets before development begins.",
    assignee: {
      id: "u1",
      fullName: "Jane Smith",
      imageUrl: "/man.jpg",
    },
    deadline: new Date("2025-11-20T17:00:00"),
    category: {
      id: 1,
      name: "Design",
    },
    project: {
      id: 2,
      title: "Website Redesign",
    },
    status: "active",
    subtasks: [
      { id: 1, text: "Wireframe the layout", isDone: true },
      { id: 2, text: "Create high-fidelity mockups", isDone: false },
      { id: 3, text: "Review with stakeholders", isDone: false },
    ],
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
    id: 1,
    title: "Design homepage layout",
    description:
      "Create a modern and responsive homepage layout for the new project. The design should include a hero section with a clear call-to-action, a features section highlighting the main benefits, a testimonials section, and a footer with all necessary links. Pay attention to typography, color schemes, and responsive behavior on both desktop and mobile devices. Ensure the design aligns with the overall branding guidelines and provides an intuitive user experience. Collaboration with the UX and content teams is required to finalize the layout and assets before development begins.",
    deadline: new Date("2025-11-20T17:00:00"),
    category: {
      id: 1,
      name: "Design",
    },
    project: {
      id: 1,
      title: "Website Redesign",
    },
    status: "active",
    subtasks: [],
    attachments: [],
  },
} satisfies Story;
