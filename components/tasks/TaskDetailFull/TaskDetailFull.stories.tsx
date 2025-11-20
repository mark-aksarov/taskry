import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetailFull } from "./TaskDetailFull";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { MockedCommentsContainer } from "@/components/comments/MockedCommentsContainer";
import { TaskDetailFullComments } from "./TaskDetailFullComments";

const meta = {
  title: "Components/tasks/TaskDetailFull",
  component: TaskDetailFull,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
    withThemedBackground,
  ],
  parameters: {
    backgroundVariant: "alt",
  },
} satisfies Meta<typeof TaskDetailFull>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    description:
      "Create a modern and responsive homepage layout for the new project. The design should include a hero section with a clear call-to-action, a features section highlighting the main benefits, a testimonials section, and a footer with all necessary links. Pay attention to typography, color schemes, and responsive behavior on both desktop and mobile devices. Ensure the design aligns with the overall branding guidelines and provides an intuitive user experience. Collaboration with the UX and content teams is required to finalize the layout and assets before development begins.",
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
    comments: (
      <TaskDetailFullComments>
        <MockedCommentsContainer />
      </TaskDetailFullComments>
    ),
  },
} satisfies Story;
