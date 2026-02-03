import {
  addDays,
  endOfDay,
  endOfWeek,
  startOfDay,
  startOfWeek,
} from "date-fns";

import prisma from "@/lib/prisma";
import { ProjectStatus, TaskStatus } from "@/generated/prisma/enums";

const now = new Date();

export const dates = {
  overdue: addDays(startOfDay(now), -5),
  today: endOfDay(now),
  tomorrow: endOfDay(addDays(now, 1)),
  thisWeek: endOfWeek(now, { weekStartsOn: 1 }),
  nextWeek: endOfWeek(addDays(now, 7), { weekStartsOn: 1 }),
  prevWeek: startOfWeek(addDays(now, -7), { weekStartsOn: 1 }),
};

export async function seedWorkspaces() {
  return prisma.workspace.createMany({
    data: [{ id: 1 }, { id: 2 }],
  });
}

export async function seedProjectCategories() {
  return prisma.projectCategory.createMany({
    data: [
      { id: 1, name: "Project Category 1", workspaceId: 1 },
      { id: 2, name: "Project Category 2", workspaceId: 2 },
    ],
  });
}

export async function seedProjects() {
  await prisma.project.createMany({
    data: [
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
    ],
  });
}

export async function seedTaskCategories() {
  return prisma.taskCategory.createMany({
    data: [
      { id: 1, name: "Task Category 1", workspaceId: 1 },
      { id: 2, name: "Task Category 2", workspaceId: 2 },
    ],
  });
}

export async function seedTasks() {
  await prisma.task.createMany({
    data: [
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
        title: "Task 1",
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
        title: "Task 1",
        deadline: new Date("2025-12-29"),
        description: "Description 3",
        status: TaskStatus.active,
        projectId: 2,
        categoryId: 2,
        assigneeId: "user-1",
        workspaceId: 2,
      },
    ],
  });
}

export async function seedCompanies() {
  return prisma.company.createMany({
    data: [
      { id: 1, name: "Company 1", workspaceId: 1 },
      { id: 2, name: "Company 2", workspaceId: 2 },
    ],
  });
}

export async function seedPositions() {
  return prisma.position.createMany({
    data: [
      { id: 1, name: "Position 1", workspaceId: 1 },
      { id: 2, name: "Position 2", workspaceId: 2 },
    ],
  });
}

export async function seedUsers() {
  return prisma.user.createMany({
    data: [
      {
        id: "user-1",
        fullName: "User 1",
        bio: "user 1 bio",
        phoneNumber: "phone 1",
        email: "user-1@test.com",
        imageUrl: "https://example.com/user-1.jpg",
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
        imageUrl: "https://example.com/user-2.jpg",
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
        imageUrl: "https://example.com/user-3.jpg",
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
        imageUrl: "https://example.com/user-4.jpg",
        publicLink: "https://example.com/user-4",
        address: "address user 4",
        role: "manager",
        positionId: 2,
        workspaceId: 2,
      },
    ],
  });
}

export async function seedCustomers() {
  return prisma.customer.createMany({
    data: [
      {
        id: 1,
        bio: "Customer 1 bio",
        fullName: "Customer 1",
        email: "customer-1@test.com",
        imageUrl: "https://example.com/customer-1.jpg",
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
        imageUrl: "https://example.com/customer-2.jpg",
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
        imageUrl: "https://example.com/customer-2.jpg",
        phoneNumber: "987-654-3210",
        publicLink: "https://example.com/customer-2",
        companyId: 2,
        workspaceId: 2,
      },
    ],
  });
}

export async function seedComments() {
  await prisma.comment.createMany({
    data: [
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
    ],
  });
}
