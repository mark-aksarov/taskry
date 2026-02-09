import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

export const workspaces = [{ id: 1 }, { id: 2 }];
export const projectCategories = [
  { id: 1, name: "Project Category 1", workspaceId: 1 },
  { id: 2, name: "Project Category 2", workspaceId: 2 },
];
export const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description 1",
    deadline: new Date("2025-12-31"),
    creatorId: "user-1",
    customerId: 1,
    categoryId: 1,
    workspaceId: 1,
    status: ProjectStatus.active,
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description 2",
    deadline: new Date("2025-12-30"),
    customerId: 1,
    categoryId: 1,
    workspaceId: 1,
    status: ProjectStatus.active,
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description 3",
    deadline: new Date("2025-12-29"),
    customerId: 2,
    categoryId: 2,
    workspaceId: 2,
    status: ProjectStatus.active,
  },
];

export const taskCategories = [
  { id: 1, name: "Task Category 1", workspaceId: 1 },
  { id: 2, name: "Task Category 2", workspaceId: 2 },
];

export const tasks = [
  {
    id: 1,
    title: "Task 1",
    deadline: new Date("2025-12-31"),
    description: "Description 1",
    status: TaskStatus.active,
    projectId: 1,
    categoryId: 1,
    assigneeId: "user-1",
    workspaceId: 1,
  },
  {
    id: 2,
    title: "Task 2",
    deadline: new Date("2025-12-30"),
    description: "Description 2",
    status: TaskStatus.active,
    projectId: 1,
    categoryId: 1,
    assigneeId: "user-1",
    workspaceId: 1,
  },
  {
    id: 3,
    title: "Task 3",
    deadline: new Date("2025-12-29"),
    description: "Description 3",
    status: TaskStatus.active,
    projectId: 2,
    categoryId: 2,
    assigneeId: "user-1",
    workspaceId: 2,
  },
];

export const companies = [
  { id: 1, name: "Company 1", workspaceId: 1 },
  { id: 2, name: "Company 2", workspaceId: 2 },
];

export const positions = [
  { id: 1, name: "Position 1", workspaceId: 1 },
  { id: 2, name: "Position 2", workspaceId: 2 },
];

export const users = [
  {
    id: "user-1",
    fullName: "User 1",
    bio: "user 1 bio",
    phoneNumber: "phone 1",
    email: "user-1@test.com",
    emailVerified: true,
    imageUrl: "/man.jpg",
    publicLink: "https://example.com/user-1",
    address: "address user 1",
    role: "owner",
    positionId: 1,
    workspaceId: 1,
  },
  {
    id: "user-2",
    fullName: "User 2",
    bio: "user 2 bio",
    phoneNumber: "phone 2",
    email: "user-2@test.com",
    emailVerified: true,
    imageUrl: "/man.jpg",
    publicLink: "https://example.com/user-2",
    address: "address user 2",
    role: "user",
    positionId: 1,
    workspaceId: 1,
  },
  {
    id: "user-3",
    fullName: "User 3",
    bio: "user 3 bio",
    phoneNumber: "phone 3",
    email: "user-3@test.com",
    emailVerified: true,
    imageUrl: "/man.jpg",
    publicLink: "https://example.com/user-3",
    address: "address user 3",
    role: "guest",
    positionId: 1,
    workspaceId: 1,
  },
  {
    id: "user-4",
    fullName: "User 4",
    bio: "user 4 bio",
    phoneNumber: "phone 4",
    email: "user-4@test.com",
    emailVerified: true,
    imageUrl: "https://example.com/user-4.jpg",
    publicLink: "https://example.com/user-4",
    address: "address user 4",
    role: "manager",
    positionId: 2,
    workspaceId: 2,
  },
];

export const accounts = [
  {
    id: "account-1",
    password:
      "df7e56ada337fc279c71bc2a34a20489:28aba8385a21ae385f98076554a3ecd02ed35fa4d7178a4cedc7820eb161fa6bbe2048b423e5124ae1b489952453131e688d49750d2d48178f5f7e256d3e947d",
    accountId: "account-1",
    providerId: "credential",
    userId: "user-1",
    createdAt: new Date("2023-01-10T10:00:00Z"),
    updatedAt: new Date("2023-01-10T10:00:00Z"),
  },
  {
    id: "account-2",
    password:
      "df7e56ada337fc279c71bc2a34a20489:28aba8385a21ae385f98076554a3ecd02ed35fa4d7178a4cedc7820eb161fa6bbe2048b423e5124ae1b489952453131e688d49750d2d48178f5f7e256d3e947d",
    accountId: "account-2",
    providerId: "credential",
    userId: "user-2",
    createdAt: new Date("2023-01-10T10:00:00Z"),
    updatedAt: new Date("2023-01-10T10:00:00Z"),
  },
  {
    id: "account-3",
    password:
      "df7e56ada337fc279c71bc2a34a20489:28aba8385a21ae385f98076554a3ecd02ed35fa4d7178a4cedc7820eb161fa6bbe2048b423e5124ae1b489952453131e688d49750d2d48178f5f7e256d3e947d",
    accountId: "account-3",
    providerId: "credential",
    userId: "user-3",
    createdAt: new Date("2023-01-10T10:00:00Z"),
    updatedAt: new Date("2023-01-10T10:00:00Z"),
  },
];

export const customers = [
  {
    id: 1,
    bio: "Customer 1 bio",
    fullName: "Customer 1",
    email: "customer-1@test.com",
    imageUrl: "/man.jpg",
    phoneNumber: "123-456-7890",
    publicLink: "https://example.com/customer-1",
    companyId: 1,
    workspaceId: 1,
  },
  {
    id: 2,
    bio: "Customer 2 bio",
    fullName: "Customer 2",
    email: "customer-2@test.com",
    imageUrl: "/man.jpg",
    phoneNumber: "987-654-3210",
    publicLink: "https://example.com/customer-2",
    companyId: 1,
    workspaceId: 1,
  },
  {
    id: 3,
    bio: "Customer 2 bio",
    fullName: "Customer 2",
    email: "customer-2@test.com",
    imageUrl: "/man.jpg",
    phoneNumber: "987-654-3210",
    publicLink: "https://example.com/customer-2",
    companyId: 2,
    workspaceId: 2,
  },
];

export const comments = [
  {
    id: 1,
    content: "Comment 1",
    projectId: 1,
    taskId: null,
    workspaceId: 1,
    senderId: "user-1",
    createdAt: new Date("2025-03-01"),
  },
  {
    id: 2,
    content: "Comment 2",
    projectId: 1,
    taskId: null,
    workspaceId: 1,
    senderId: "user-1",
    createdAt: new Date("2025-03-02"),
  },
  {
    id: 3,
    content: "Comment 3",
    projectId: null,
    taskId: 1,
    workspaceId: 1,
    senderId: "user-1",
    createdAt: new Date("2025-03-03"),
  },
];
