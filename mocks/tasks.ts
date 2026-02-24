import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export const mockedTaskSearchList = [
  { id: 1, title: "Task 1", deadline: "2025-01-01" },
  { id: 2, title: "Task 2", deadline: "2025-01-02" },
  { id: 3, title: "Task 3", deadline: "2025-01-03" },
  { id: 4, title: "Task 4", deadline: "2025-01-04" },
  { id: 5, title: "Task 5", deadline: "2025-01-05" },
  { id: 6, title: "Task 6", deadline: "2025-01-06" },
  { id: 7, title: "Task 7", deadline: "2025-01-07" },
  { id: 8, title: "Task 8", deadline: "2025-01-08" },
  { id: 9, title: "Task 9", deadline: "2025-01-09" },
  { id: 10, title: "Task 10", deadline: "2025-01-10" },
  { id: 11, title: "Task 11", deadline: "2025-01-11" },
];

export const mockedTaskDetail = {
  id: 1,
  title: "Task 1",
  description: "Task description. General information goes here.",
  assignee: {
    id: "1",
    fullName: "User 1",
    imageUrl: "/man.jpg",
  },
  deadline: "2025-01-01",
  status: TaskStatus.active,
  creator: {
    id: "2",
    fullName: "User 2",
    imageUrl: "/man.jpg",
  },
  project: {
    id: 1,
    title: "Project 1",
  },
  category: {
    id: 1,
    name: "Category 1",
  },
};

export const mockedTaskList = [
  {
    id: 1,
    title: "Task 1",
    status: TaskStatus.pending,
    deadline: "2025-01-01",
    commentsCount: 10,
    assignee: {
      id: "user1",
      fullName: "User 1",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 1,
      title: "Project 1",
      status: ProjectStatus.active,
    },
    category: {
      id: 1,
      name: "Category 1",
    },
    subtasks: { total: 5, done: 2 },
  },
  {
    id: 2,
    title: "Task 2",
    status: TaskStatus.active,
    deadline: "2025-01-02",
    commentsCount: 22,
    project: {
      id: 2,
      title: "Project 2",
      status: ProjectStatus.active,
    },
    category: {
      id: 2,
      name: "Category 2",
    },
    subtasks: { total: 8, done: 3 },
  },
  {
    id: 3,
    title: "Task 3",
    status: TaskStatus.completed,
    deadline: "2025-01-03",
    commentsCount: 2,
    assignee: {
      id: "user3",
      fullName: "User 3",
    },
    project: {
      id: 3,
      title: "Project 3",
      status: ProjectStatus.completed,
    },
    category: {
      id: 3,
      name: "Category 3",
    },
    subtasks: { total: 4, done: 4 },
  },
  {
    id: 4,
    title: "Task 4",
    status: TaskStatus.pending,
    deadline: "2025-01-04",
    commentsCount: 12,
    assignee: {
      id: "user4",
      fullName: "User 4",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 4,
      title: "Project 4",
      status: ProjectStatus.active,
    },
    category: {
      id: 4,
      name: "Category 4",
    },
    subtasks: { total: 6, done: 1 },
  },
  {
    id: 5,
    title: "Task 5",
    status: TaskStatus.active,
    deadline: "2025-01-05",
    commentsCount: 15,
    assignee: {
      id: "user5",
      fullName: "User 5",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 5,
      title: "Project 5",
      status: ProjectStatus.active,
    },
    category: {
      id: 5,
      name: "Category 5",
    },
    subtasks: { total: 7, done: 4 },
  },
  {
    id: 6,
    title: "Task 6",
    status: TaskStatus.completed,
    deadline: "2025-01-06",
    commentsCount: 9,
    assignee: {
      id: "user6",
      fullName: "User 6",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 6,
      title: "Project 6",
      status: ProjectStatus.completed,
    },
    category: {
      id: 6,
      name: "Category 6",
    },
    subtasks: { total: 3, done: 3 },
  },
  {
    id: 7,
    title: "Task 7",
    status: TaskStatus.completed,
    deadline: "2025-01-07",
    commentsCount: 12,
    assignee: {
      id: "user7",
      fullName: "User 7",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 7,
      title: "Project 7",
      status: ProjectStatus.completed,
    },
    category: {
      id: 7,
      name: "Category 7",
    },
    subtasks: { total: 5, done: 5 },
  },
  {
    id: 8,
    title: "Task 8",
    status: TaskStatus.active,
    deadline: "2025-01-08",
    commentsCount: 10,
    assignee: {
      id: "user8",
      fullName: "User 8",
      imageUrl: "/man.jpg",
    },
    project: {
      id: 8,
      title: "Project 8",
      status: ProjectStatus.active,
    },
    category: {
      id: 8,
      name: "Category 8",
    },
    subtasks: { total: 2, done: 1 },
  },
  {
    id: 9,
    title: "Task 9",
    status: TaskStatus.pending,
    deadline: "2025-01-09",
    commentsCount: 23,
    assignee: {
      id: "user9",
      fullName: "User 9",
    },
    project: {
      id: 9,
      title: "Project 9",
      status: ProjectStatus.active,
    },
    category: {
      id: 9,
      name: "Category 9",
    },
    subtasks: { total: 6, done: 2 },
  },
  {
    id: 10,
    title: "Task 10",
    status: TaskStatus.completed,
    deadline: "2025-01-10",
    commentsCount: 13,
    project: {
      id: 10,
      title: "Project 10",
      status: ProjectStatus.completed,
    },
    category: {
      id: 10,
      name: "Category 10",
    },
    subtasks: { total: 4, done: 4 },
  },
];
