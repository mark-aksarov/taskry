import { fn } from "storybook/test";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectGridItem } from "../ProjectGridItem";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";

const mockedProjects = [
  {
    id: 1,
    title: "Website Redesign",
    deadline: new Date("2025-06-30"),
    creator: { id: "u1", fullName: "Alice Smith", imageUrl: "/woman.jpg" },
    status: ProjectStatus.pending,
    commentsCount: 5,
    tasksTotal: 10,
    tasksCompleted: 8,
  },
  {
    id: 2,
    title: "Mobile App Launch",
    deadline: new Date("2025-08-15"),
    creator: { id: "u2", fullName: "Bob Johnson", imageUrl: "/man.jpg" },
    status: ProjectStatus.active,
    commentsCount: 5,
    tasksTotal: 12,
    tasksCompleted: 4,
  },
  {
    id: 3,
    title: "Marketing Campaign Q2",
    deadline: new Date("2025-05-31"),
    creator: { id: "u3", fullName: "Carol White", imageUrl: "/woman.jpg" },
    status: ProjectStatus.completed,
    commentsCount: 3,
    tasksTotal: 8,
    tasksCompleted: 8,
  },
  {
    id: 4,
    title: "Server Migration",
    deadline: new Date("2025-07-15"),
    creator: { id: "u4", fullName: "David Green", imageUrl: "/man.jpg" },
    status: ProjectStatus.pending,
    commentsCount: 6,
    tasksTotal: 15,
    tasksCompleted: 2,
  },
  {
    id: 5,
    title: "SEO Optimization",
    deadline: new Date("2025-06-01"),
    creator: { id: "u5", fullName: "Eva Black", imageUrl: "/woman.jpg" },
    status: ProjectStatus.active,
    commentsCount: 4,
    tasksTotal: 6,
    tasksCompleted: 3,
  },
  {
    id: 6,
    title: "Internal Dashboard",
    deadline: new Date("2025-09-01"),
    creator: { id: "u6", fullName: "Frank Moore", imageUrl: "/man.jpg" },
    status: ProjectStatus.pending,
    commentsCount: 7,
    tasksTotal: 20,
    tasksCompleted: 5,
  },
  {
    id: 7,
    title: "Customer Feedback",
    deadline: new Date("2025-03-20"),
    creator: { id: "u7", fullName: "Grace Hall", imageUrl: "/woman.jpg" },
    status: ProjectStatus.completed,
    commentsCount: 4,
    tasksTotal: 10,
    tasksCompleted: 10,
  },
  {
    id: 8,
    title: "Product Photography",
    deadline: new Date("2025-07-10"),
    creator: { id: "u8", fullName: "Henry Young", imageUrl: "/man.jpg" },
    status: ProjectStatus.pending,
    commentsCount: 6,
    tasksTotal: 4,
    tasksCompleted: 1,
  },
  {
    id: 9,
    title: "Cloud Security Audit",
    deadline: new Date("2025-08-05"),
    creator: { id: "u9", fullName: "Ivy Adams", imageUrl: "/woman.jpg" },
    status: ProjectStatus.active,
    commentsCount: 3,
    tasksTotal: 14,
    tasksCompleted: 12,
  },
  {
    id: 10,
    title: "Annual Report 2025",
    deadline: new Date("2025-05-31"),
    creator: { id: "u10", fullName: "Jack Carter", imageUrl: "/man.jpg" },
    status: ProjectStatus.completed,
    commentsCount: 8,
    tasksTotal: 25,
    tasksCompleted: 25,
  },
];

const meta = {
  title: "Components/projects/ProjectGrid",
  component: ProjectGrid,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof ProjectGrid>;

export default meta;
type Story = StoryObj<typeof ProjectGrid>;

export const Default = {
  args: {
    children: (
      <>
        {mockedProjects.map((project) => (
          <ProjectGridItem
            key={project.id}
            {...project}
            menuTrigger={
              <ProjectItemActionMenuTrigger
                projectId={project.id}
                projectTitle={project.title}
                projectStatus={project.status}
                deleteAction={fn()}
                updateStatusAction={fn()}
                className="-mr-2"
              />
            }
          />
        ))}
      </>
    ),
  },
} satisfies Story;
