import { Company } from "@/generated/prisma";

export const companiesMock: Company[] = [
  {
    id: 1,
    name: "Elevare",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Verdeo",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "CodeLoom",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "TerraNova",
    workspaceId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
