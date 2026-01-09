import { fn } from "storybook/test";
import { ProjectList } from "./ProjectList";
import { ProjectListItem } from "../ProjectListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { ProjectItemActionMenuTrigger } from "../ProjectItemActionMenuTrigger";

const mockedProjects = [
  {
    id: 1,
    title: "Website Redesign",
    deadline: new Date("2025-06-30"),
    creator: { id: "user1", fullName: "Alice Smith", imageUrl: "/woman.jpg" },
    customer: { id: 1, fullName: "John Doe", imageUrl: "/man.jpg" },
    category: { id: 1, name: "Design" },
    company: { id: 1, name: "Doe Inc." },
    status: ProjectStatus.pending,
    commentsCount: 4,
  },
  {
    id: 2,
    title: "Mobile App Launch",
    deadline: new Date("2025-08-15"),
    creator: { id: "user2", fullName: "Bob Johnson", imageUrl: "/man.jpg" },
    customer: { id: 2, fullName: "Sarah Lee", imageUrl: "/man.jpg" },
    category: { id: 2, name: "Development" },
    company: { id: 2, name: "Lee Corp." },
    status: ProjectStatus.active,
    commentsCount: 5,
  },
  {
    id: 3,
    title: "Marketing Campaign Q2",
    deadline: new Date("2025-05-31"),
    creator: { id: "user3", fullName: "Carol White", imageUrl: "/woman.jpg" },
    customer: { id: 3, fullName: "Mike Brown", imageUrl: "/man.jpg" },
    category: { id: 3, name: "Marketing" },
    company: { id: 3, name: "Brown LLC" },
    status: ProjectStatus.completed,
    commentsCount: 3,
  },
  {
    id: 4,
    title: "Server Migration",
    deadline: new Date("2025-07-15"),
    creator: { id: "user4", fullName: "David Green", imageUrl: "/man.jpg" },
    customer: { id: 4, fullName: "Emma Wilson", imageUrl: "/woman.jpg" },
    category: { id: 2, name: "IT" },
    company: { id: 4, name: "Wilson Tech" },
    status: ProjectStatus.pending,
    commentsCount: 6,
  },
  {
    id: 5,
    title: "SEO Optimization",
    deadline: new Date("2025-06-01"),
    creator: { id: "user5", fullName: "Eva Black", imageUrl: "/woman.jpg" },
    customer: { id: 5, fullName: "Tom Harris", imageUrl: "/man.jpg" },
    category: { id: 3, name: "Marketing" },
    company: { id: 5, name: "Harris Co." },
    status: ProjectStatus.active,
    commentsCount: 4,
  },
];

const meta = {
  title: "Components/projects/ProjectList",
  component: ProjectList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
  excludeStories: ["ProjectListItemsTemplate"],
} satisfies Meta<typeof ProjectList & { showCheckbox?: boolean }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    children: (
      <>
        {mockedProjects.map((project) => (
          <ProjectListItem
            key={project.id}
            {...project}
            showCheckbox={true}
            menuTrigger={
              <ProjectItemActionMenuTrigger
                projectId={project.id}
                projectTitle={project.title}
                projectStatus={project.status}
                deleteAction={fn()}
                updateStatusAction={fn()}
              />
            }
          />
        ))}
      </>
    ),
  },
} satisfies Story;
