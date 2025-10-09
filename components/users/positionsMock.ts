import { Position } from "@/generated/prisma";

export const positionsMock: Position[] = [
  {
    id: 1,
    name: "Founder",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Manager",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Designer",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Developer",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
