import { E2ESeedPayload } from "./types";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function seedE2E(payload: E2ESeedPayload) {
  await prisma.workspace.createMany({
    data: {
      id: 1,
    },
  });

  await prisma.position.createMany({
    data: [
      {
        id: 1,
        name: "CEO",
        workspaceId: 1,
      },
      {
        id: 2,
        name: "Project Manager",
        workspaceId: 1,
      },
      {
        id: 3,
        name: "Developer",
        workspaceId: 1,
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        id: "user-1",
        fullName: "John Doe",
        bio: "Visionary founder and strategic lead.",
        address: "123 Tech Lane, San Francisco, CA",
        birthdate: new Date("1988-04-12"),
        role: "owner",
        email: "owner@example.com",
        emailVerified: true,
        imageUrl: null,
        phoneNumber: "+15550101",
        publicLink: "johndoe-founder",
        positionId: 1,
        createdAt: new Date("2023-01-10T10:00:00Z"),
        workspaceId: 1,
      },
      {
        id: "user-2",
        fullName: "Sarah Jenkins",
        bio: "Expert in agile methodologies and team management.",
        address: "456 Market St, Seattle, WA",
        birthdate: new Date("1992-08-25"),
        role: "manager",
        email: "manager@example.com",
        emailVerified: true,
        imageUrl: null,
        phoneNumber: "+15550202",
        publicLink: null,
        positionId: 2,
        createdAt: new Date("2023-01-10T10:00:00Z"),
        workspaceId: 1,
      },
      {
        id: "user-3",
        fullName: "Michael Chen",
        bio: "Full-stack developer focused on React and Node.js.",
        address: "789 Pine Rd, Austin, TX",
        birthdate: new Date("1995-12-01"),
        role: "user",
        email: "user@example.com",
        emailVerified: true,
        imageUrl: null,
        phoneNumber: "+15550303",
        publicLink: null,
        positionId: 3,
        createdAt: new Date("2023-01-10T10:00:00Z"),
        workspaceId: 1,
      },
      {
        id: "user-4",
        fullName: "Kevin Lee",
        bio: "Kevin is a manager of software development team.",
        address: "454 Golden Street, Houston, WA 98101",
        birthdate: new Date("1992-09-11"),
        role: "guest",
        email: "guest@example.com",
        emailVerified: true,
        imageUrl: null,
        phoneNumber: "+15550408",
        publicLink: null,
        positionId: null,
        createdAt: new Date("2023-01-10T10:00:00Z"),
        workspaceId: 1,
      },
      {
        id: "user-5",
        fullName: "Bob Smith",
        bio: "Manager of software development team.",
        address: "654 Tech Drive, Seattle, WA 98101",
        birthdate: new Date("1994-09-11"),
        role: "manager",
        email: "manager-empty@example.com",
        emailVerified: true,
        imageUrl: null,
        phoneNumber: "+15550404",
        publicLink: null,
        positionId: 2,
        createdAt: new Date("2023-01-10T10:00:00Z"),
        workspaceId: 1,
      },
    ],
  });

  await prisma.account.createMany({
    data: [
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
      {
        id: "account-4",
        password:
          "df7e56ada337fc279c71bc2a34a20489:28aba8385a21ae385f98076554a3ecd02ed35fa4d7178a4cedc7820eb161fa6bbe2048b423e5124ae1b489952453131e688d49750d2d48178f5f7e256d3e947d",
        accountId: "account-4",
        providerId: "credential",
        userId: "user-4",
        createdAt: new Date("2023-01-10T10:00:00Z"),
        updatedAt: new Date("2023-01-10T10:00:00Z"),
      },
    ],
  });

  if (payload.companies) {
    await prisma.company.createMany({
      data: payload.companies,
    });
  }

  if (payload.customers) {
    await prisma.customer.createMany({
      data: payload.customers,
    });
  }

  if (payload.projectCategories) {
    await prisma.projectCategory.createMany({
      data: payload.projectCategories,
    });
  }

  if (payload.projects) {
    await prisma.project.createMany({
      data: payload.projects,
    });
  }

  if (payload.taskCategories) {
    await prisma.taskCategory.createMany({
      data: payload.taskCategories,
    });
  }

  if (payload.tasks) {
    await prisma.task.createMany({
      data: payload.tasks,
    });
  }

  if (payload.notifications) {
    await prisma.notification.createMany({
      data: payload.notifications,
    });
  }
}
