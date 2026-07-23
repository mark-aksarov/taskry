import {
  users,
  clients,
  positions,
  companies,
  workspaces,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClients } from "../client.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getClients", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
      companies,
      taskCategories,
      projectCategories,
      clients,
    });
  });

  it("should return clients with valid ClientDTO", async () => {
    const result = await getClients();

    expect(result).toStrictEqual([
      {
        id: 1,
        bio: "Client 1 bio",
        fullName: "Client 1",
        email: "client-1@test.com",
        imageUrl: "/man.jpg",
        phoneNumber: "123-456-7890",
        publicLink: "https://example.com/client-1",
        companyId: 1,
      },
      {
        id: 2,
        bio: "Client 2 bio",
        fullName: "Client 2",
        email: "client-2@test.com",
        imageUrl: "/man.jpg",
        phoneNumber: "987-654-3210",
        publicLink: "https://example.com/client-2",
        companyId: 1,
      },
    ]);
  });
});
