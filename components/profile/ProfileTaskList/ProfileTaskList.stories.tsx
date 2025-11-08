import { withBackgroundVariant } from "@/.storybook/decorators";
import { ProfileTaskList } from "./ProfileTaskList";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "Components/profile/ProfileTaskList",
  component: ProfileTaskList,
  parameters: { layout: "fullscreen" },
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof ProfileTaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    className: "md:gap-0 max-md:p-4",
    tasks: [
      {
        id: 1,
        title: "Design homepage layout",
        deadline: new Date("2025-11-15"),
        _count: { comments: 4, subtasks: 3 },
        subtasks: [{ isDone: true }, { isDone: false }, { isDone: false }],
      },
      {
        id: 2,
        title: "Implement authentication flow",
        deadline: new Date("2025-11-20"),
        _count: { comments: 2, subtasks: 4 },
        subtasks: [
          { isDone: true },
          { isDone: true },
          { isDone: false },
          { isDone: false },
        ],
      },
      {
        id: 3,
        title: "Write unit tests for API",
        deadline: null,
        _count: { comments: 1, subtasks: 2 },
        subtasks: [{ isDone: true }, { isDone: true }],
      },
      {
        id: 4,
        title: "Refactor dashboard components",
        deadline: new Date("2025-12-05"),
        _count: { comments: 6, subtasks: 5 },
        subtasks: [
          { isDone: false },
          { isDone: false },
          { isDone: false },
          { isDone: false },
          { isDone: false },
        ],
      },
      {
        id: 5,
        title: "Optimize image loading",
        deadline: new Date("2025-11-10"),
        _count: { comments: 0, subtasks: 0 },
      },
      {
        id: 6,
        title: "Setup CI/CD pipeline",
        deadline: new Date("2025-11-25"),
        _count: { comments: 3, subtasks: 3 },
        subtasks: [{ isDone: true }, { isDone: true }, { isDone: true }],
      },
      {
        id: 7,
        title: "Prepare documentation for release",
        deadline: new Date("2025-12-01"),
        _count: { comments: 5, subtasks: 4 },
        subtasks: [
          { isDone: true },
          { isDone: false },
          { isDone: false },
          { isDone: false },
        ],
      },
      {
        id: 8,
        title: "Create analytics dashboard",
        deadline: null,
        _count: { comments: 1, subtasks: 2 },
        subtasks: [{ isDone: false }, { isDone: false }],
      },
      {
        id: 9,
        title: "Update user profile settings page",
        deadline: new Date("2025-11-18"),
        _count: { comments: 2, subtasks: 3 },
        subtasks: [{ isDone: true }, { isDone: true }, { isDone: false }],
      },
      {
        id: 10,
        title: "Conduct usability testing",
        deadline: new Date("2025-12-10"),
        _count: { comments: 8, subtasks: 5 },
        subtasks: [
          { isDone: true },
          { isDone: true },
          { isDone: true },
          { isDone: false },
          { isDone: false },
        ],
      },
    ],
  },
} satisfies Story;
