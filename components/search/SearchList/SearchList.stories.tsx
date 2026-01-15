import { SearchList } from "./SearchList";
import type { Meta, StoryObj } from "@storybook/react";
import { UserSearchListItem } from "../UserSearchListItem";
import { TaskSearchListItem } from "../TaskSearchListItem";
import { ProjectSearchListItem } from "../ProjectSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const mockedUsers = [
  {
    id: "user1",
    fullName: "John Doe",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user2",
    fullName: "Jane Smith",
    email: "user2@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user3",
    fullName: "Michael Johnson",
    email: "user3@example.com",
    imageUrl: undefined,
  },
  {
    id: "user4",
    fullName: "Emily Davis",
    email: "user4@example.com",
    imageUrl: undefined,
  },
  {
    id: "user5",
    fullName: "Daniel Wilson",
    email: "user5@example.com",
    imageUrl: undefined,
  },
  {
    id: "user6",
    fullName: "Sophia Martinez",
    email: "user6@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user7",
    fullName: "James Brown",
    email: "user7@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user8",
    fullName: "Olivia Garcia",
    email: "user8@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user9",
    fullName: "William Miller",
    email: "user9@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user10",
    fullName: "Ava Taylor",
    email: "user10@example.com",
    imageUrl: "/woman.jpg",
  },
];

const mockedTasks = [
  {
    id: 1,
    title: "Design landing page",
    deadline: new Date("2025-09-30"),
  },
  {
    id: 2,
    title: "Implement login system",
    deadline: new Date("2025-10-05"),
  },
  {
    id: 3,
    title: "Database schema migration",
    deadline: new Date("2025-10-10"),
  },
  {
    id: 4,
    title: "Write unit tests",
    deadline: new Date("2025-10-12"),
  },
  {
    id: 5,
    title: "Prepare deployment pipeline",
    deadline: new Date("2025-10-15"),
  },
  {
    id: 6,
    title: "Set up staging environment",
    deadline: new Date("2025-10-18"),
  },
  {
    id: 7,
    title: "Create onboarding flow",
    deadline: new Date("2025-10-20"),
  },
  {
    id: 8,
    title: "Fix payment bug",
    deadline: new Date("2025-10-22"),
  },
  {
    id: 9,
    title: "Optimize image loading",
    deadline: new Date("2025-10-25"),
  },
  {
    id: 10,
    title: "Refactor auth middleware",
    deadline: new Date("2025-10-28"),
  },
];

const mockedProjects = [
  {
    id: 1,
    title: "Website Redesign",
    deadline: new Date("2025-06-30"),
  },
  {
    id: 2,
    title: "Mobile App Launch",
    deadline: new Date("2025-08-15"),
  },
  {
    id: 3,
    title: "Marketing Campaign Q2",
    deadline: new Date("2025-05-31"),
  },
  {
    id: 4,
    title: "Server Migration",
    deadline: new Date("2025-07-15"),
  },
  {
    id: 5,
    title: "SEO Optimization",
    deadline: new Date("2025-06-01"),
  },
];

const meta = {
  title: "Components/search/SearchList",
  component: SearchList,
  tags: ["autodocs"],
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof SearchList>;

export const UsersSearchList = {
  args: {
    children: mockedUsers.map((user) => (
      <UserSearchListItem key={user.id} {...user} />
    )),
  },
} satisfies Story;

export const TasksSearchList = {
  args: {
    children: mockedTasks.map((task) => (
      <TaskSearchListItem key={task.id} {...task} />
    )),
  },
} satisfies Story;

export const ProjectsSearchList = {
  args: {
    children: mockedProjects.map((project) => (
      <ProjectSearchListItem key={project.id} {...project} />
    )),
  },
} satisfies Story;
