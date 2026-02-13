import { SearchList } from "../SearchList";
import type { Meta, StoryObj } from "@storybook/react";
import { UserSearchListItem } from "../../UserSearchListItem";
import { TaskSearchListItem } from "../../TaskSearchListItem";
import { ProjectSearchListItem } from "../../ProjectSearchListItem";
import { withThemedBackground } from "@/.storybook/withThemedBackground";
import { CustomerSearchListItem } from "../../CustomerSearchListItem";

const mockedUsers = [
  {
    id: "user1",
    fullName: "User 1",
    email: "user1@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user2",
    fullName: "User 2",
    email: "user2@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user3",
    fullName: "User 3",
    email: "user3@example.com",
    imageUrl: undefined,
  },
  {
    id: "user4",
    fullName: "User 4",
    email: "user4@example.com",
    imageUrl: undefined,
  },
  {
    id: "user5",
    fullName: "User 5",
    email: "user5@example.com",
    imageUrl: undefined,
  },
  {
    id: "user6",
    fullName: "User 6",
    email: "user6@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user7",
    fullName: "User 7",
    email: "user7@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user8",
    fullName: "User 8",
    email: "user8@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: "user9",
    fullName: "User 9",
    email: "user9@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: "user10",
    fullName: "User 10",
    email: "user10@example.com",
    imageUrl: "/woman.jpg",
  },
];

const mockedTasks = [
  { id: 1, title: "Task 1", deadline: new Date("2025-01-01") },
  { id: 2, title: "Task 2", deadline: new Date("2025-01-02") },
  { id: 3, title: "Task 3", deadline: new Date("2025-01-03") },
  { id: 4, title: "Task 4", deadline: new Date("2025-01-04") },
  { id: 5, title: "Task 5", deadline: new Date("2025-01-05") },
  { id: 6, title: "Task 6", deadline: new Date("2025-01-06") },
  { id: 7, title: "Task 7", deadline: new Date("2025-01-07") },
  { id: 8, title: "Task 8", deadline: new Date("2025-01-08") },
  { id: 9, title: "Task 9", deadline: new Date("2025-01-09") },
  { id: 10, title: "Task 10", deadline: new Date("2025-01-10") },
];

const mockedProjects = [
  { id: 1, title: "Project 1", deadline: new Date("2025-01-01") },
  { id: 2, title: "Project 2", deadline: new Date("2025-01-02") },
  { id: 3, title: "Project 3", deadline: new Date("2025-01-03") },
  { id: 4, title: "Project 4", deadline: new Date("2025-01-04") },
  { id: 5, title: "Project 5", deadline: new Date("2025-01-05") },
];

const mockedCustomers = [
  {
    id: 1,
    fullName: "Customer 1",
    email: "customer1@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: 2,
    fullName: "Customer 2",
    email: "customer2@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: 3,
    fullName: "Customer 3",
    email: "customer3@example.com",
    imageUrl: undefined,
  },
  {
    id: 4,
    fullName: "Customer 4",
    email: "customer4@example.com",
    imageUrl: undefined,
  },
  {
    id: 5,
    fullName: "Customer 5",
    email: "customer5@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: 6,
    fullName: "Customer 6",
    email: "customer6@example.com",
    imageUrl: "/woman.jpg",
  },
  {
    id: 7,
    fullName: "Customer 7",
    email: "customer7@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: 8,
    fullName: "Customer 8",
    email: "customer8@example.com",
    imageUrl: undefined,
  },
  {
    id: 9,
    fullName: "Customer 9",
    email: "customer9@example.com",
    imageUrl: "/man.jpg",
  },
  {
    id: 10,
    fullName: "Customer 10",
    email: "customer10@example.com",
    imageUrl: "/woman.jpg",
  },
];

const meta = {
  title: "components/search/SearchList",
  component: SearchList,
  decorators: [withThemedBackground],
} satisfies Meta<typeof SearchList>;

export default meta;
type Story = StoryObj<typeof meta>;

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

export const CustomersSearchList = {
  args: {
    children: mockedCustomers.map((customer) => (
      <CustomerSearchListItem key={customer.id} {...customer} />
    )),
  },
} satisfies Story;
