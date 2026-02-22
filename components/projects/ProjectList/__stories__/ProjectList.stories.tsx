import { ProjectList } from "../ProjectList";
import { ProjectListItem } from "../../ProjectListItem";
import type { Meta, StoryObj } from "@storybook/react";
import { ProjectStatus } from "@/generated/prisma/enums";
import { ProjectListItemStory } from "../../ProjectListItem/__stories__";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { withDeleteProjectModalProvider } from "../../DeleteProjectModal/__stories__";
import { withSelectedProjectsProvider } from "../../SelectedProjectsContext/__stories__";
import { withUpdateProjectStatusesProvider } from "../../UpdateProjectStatusContext/__stories__";
import { withDeleteCommentModalProvider } from "@/components/comments/DeleteCommentModal/__stories__";
import { withPageTransitionProvider } from "@/components/common/PageTransitionContext/__stories__";

export const mockedProjects = [
  {
    id: 1,
    title: "Project 1",
    deadline: "2025-01-01",
    creator: { id: "user1", fullName: "User 1", imageUrl: "/woman.jpg" },
    customer: { id: 1, fullName: "Customer 1", imageUrl: "/man.jpg" },
    category: { id: 1, name: "Category 1" },
    company: { id: 1, name: "Company 1" },
    status: ProjectStatus.pending,
    tasksTotal: 10,
    tasksCompleted: 8,
    commentsCount: 4,
  },
  {
    id: 2,
    title: "Project 2",
    deadline: "2025-01-02",
    creator: { id: "user2", fullName: "User 2", imageUrl: "/man.jpg" },
    customer: { id: 2, fullName: "Customer 2", imageUrl: "/man.jpg" },
    category: { id: 2, name: "Category 2" },
    company: { id: 2, name: "Company 2" },
    status: ProjectStatus.active,
    tasksTotal: 8,
    tasksCompleted: 4,
    commentsCount: 5,
  },
  {
    id: 3,
    title: "Project 3",
    deadline: "2025-01-03",
    creator: { id: "user3", fullName: "User 3", imageUrl: "/woman.jpg" },
    customer: { id: 3, fullName: "Customer 3", imageUrl: "/man.jpg" },
    category: { id: 3, name: "Category 3" },
    company: { id: 3, name: "Company 3" },
    status: ProjectStatus.completed,
    tasksTotal: 9,
    tasksCompleted: 12,
    commentsCount: 3,
  },
  {
    id: 4,
    title: "Project 4",
    deadline: "2025-01-04",
    creator: { id: "user4", fullName: "User 4", imageUrl: "/man.jpg" },
    customer: { id: 4, fullName: "Customer 4", imageUrl: "/woman.jpg" },
    category: { id: 4, name: "Category 4" },
    company: { id: 4, name: "Company 4" },
    status: ProjectStatus.pending,
    tasksTotal: 10,
    tasksCompleted: 8,
    commentsCount: 6,
  },
  {
    id: 5,
    title: "Project 5",
    deadline: "2025-01-05",
    creator: { id: "user5", fullName: "User 5", imageUrl: "/woman.jpg" },
    customer: { id: 5, fullName: "Customer 5", imageUrl: "/man.jpg" },
    category: { id: 5, name: "Category 5" },
    company: { id: 5, name: "Company 5" },
    status: ProjectStatus.active,
    tasksTotal: 8,
    tasksCompleted: 8,
    commentsCount: 4,
  },
];

const meta = {
  title: "components/projects/ProjectList",
  component: ProjectList,
  decorators: [
    withPageTransitionProvider,
    withSelectedProjectsProvider,
    withDeleteCommentModalProvider,
    withUpdateProjectStatusesProvider,
    withDeleteProjectModalProvider,
    withThemedBackground,
  ],
  excludeStories: ["mockedProjects"],
} satisfies Meta<typeof ProjectList & { showCheckbox?: boolean }>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    showCheckbox: true,
    children: mockedProjects.map((project) => (
      <ProjectListItem
        key={project.id}
        {...ProjectListItemStory.args}
        {...project}
        showCheckbox={true}
      />
    )),
  },
} satisfies Story;
