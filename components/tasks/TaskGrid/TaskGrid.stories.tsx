import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TaskGrid } from "./TaskGrid";
import { withBackgroundVariant } from "@/.storybook/decorators";

const meta = {
  title: "Components/tasks/TaskGrid",
  component: TaskGrid,
  tags: ["autodocs"],
  decorators: [withBackgroundVariant()],
} satisfies Meta<typeof TaskGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    tasks: [
      {
        id: 1,
        title: "Design homepage",
        deadline: new Date("2025-09-28"),
        creator: { id: "user1", imageUrl: "/man.jpg", fullName: "Liam Turner" },
        subtasks: [{ isDone: false }, { isDone: true }, { isDone: false }],
      },
      {
        id: 2,
        title: "Implement authentication",
        deadline: new Date("2025-10-06"),
        creator: null,
        subtasks: [
          { isDone: false },
          { isDone: true },
          { isDone: true },
          { isDone: false },
        ],
      },
      {
        id: 3,
        title: "Migrate database schema",
        deadline: new Date("2025-10-11"),
        creator: { id: "user3", imageUrl: null, fullName: "Olivia White" },
        subtasks: [{ isDone: true }, { isDone: true }],
      },
      {
        id: 4,
        title: "Write automated tests",
        deadline: new Date("2025-10-13"),
        creator: { id: "user4", imageUrl: "/man.jpg", fullName: "Ethan Green" },
        subtasks: [
          { isDone: false },
          { isDone: true },
          { isDone: true },
          { isDone: false },
        ],
      },
      {
        id: 5,
        title: "Setup CI/CD pipeline",
        deadline: new Date("2025-10-16"),
        creator: { id: "user5", imageUrl: "/man.jpg", fullName: "Mason Moore" },
        subtasks: [
          { isDone: true },
          { isDone: true },
          { isDone: false },
          { isDone: true },
        ],
      },
      {
        id: 6,
        title: "Setup staging environment",
        deadline: new Date("2025-10-19"),
        creator: { id: "user6", imageUrl: "/man.jpg", fullName: "Ava Black" },
        subtasks: [{ isDone: true }, { isDone: true }, { isDone: true }],
      },
      {
        id: 7,
        title: "Design onboarding flow",
        deadline: new Date("2025-10-21"),
        creator: {
          id: "user7",
          imageUrl: "/man.jpg",
          fullName: "Isabella Hall",
        },
        subtasks: [{ isDone: true }, { isDone: true }, { isDone: true }],
      },
      {
        id: 8,
        title: "Fix checkout bug",
        deadline: new Date("2025-10-23"),
        creator: { id: "user8", imageUrl: "/man.jpg", fullName: "Henry Young" },
        subtasks: [{ isDone: false }, { isDone: true }, { isDone: false }],
      },
      {
        id: 9,
        title: "Optimize image loading",
        deadline: new Date("2025-10-26"),
        creator: { id: "user9", imageUrl: null, fullName: "Ivy Adams" },
        subtasks: [{ isDone: true }, { isDone: false }, { isDone: false }],
      },
      {
        id: 10,
        title: "Refactor authentication middleware",
        deadline: new Date("2025-10-29"),
        creator: null,
        subtasks: [{ isDone: true }, { isDone: true }, { isDone: false }],
      },
    ],
  },
} satisfies Story;
