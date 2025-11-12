import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskDetail } from "./TaskDetail";
import { withBackgroundVariant } from "@/.storybook/withBackgroundVariant";
import { withContainerWidth } from "@/.storybook/withContainerWidth";
import { CommentsContainerProvider } from "@/components/comments/CommentsContainer";
import { MockedTaskCommentsContainer } from "../TaskCommentsModalTrigger/TaskCommentsModalTrigger.stories";

const meta = {
  title: "components/tasks/TaskDetail",
  component: TaskDetail,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <CommentsContainerProvider
        CommentsContainer={() => <MockedTaskCommentsContainer />}
      >
        <Story />
      </CommentsContainerProvider>
    ),
    withContainerWidth(),
    withBackgroundVariant({ variant: "alt" }),
  ],
} satisfies Meta<typeof TaskDetail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    id: 1,
    title: "Design homepage layout",
    description:
      "Create a modern and responsive homepage layout for the new project. The design should include a hero section with a clear call-to-action, a features section highlighting the main benefits, a testimonials section, and a footer with all necessary links. Pay attention to typography, color schemes, and responsive behavior on both desktop and mobile devices. Ensure the design aligns with the overall branding guidelines and provides an intuitive user experience. Collaboration with the UX and content teams is required to finalize the layout and assets before development begins.",
    deadline: new Date("2025-11-20T17:00:00"),
    category: {
      id: 101,
      name: "Design",
    },
    project: {
      id: 201,
      title: "Website Redesign",
    },
    status: {
      id: 301,
      name: "In Progress",
    },
    subtasks: [
      { id: 1, name: "Wireframe the layout", isDone: true },
      { id: 2, name: "Create high-fidelity mockups", isDone: false },
      { id: 3, name: "Review with stakeholders", isDone: false },
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
