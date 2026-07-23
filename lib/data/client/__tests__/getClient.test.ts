import {
  users,
  positions,
  companies,
  workspaces,
  taskCategories,
  clients,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClient } from "../client.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClient", () => {
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

  it("should return a valid ClientDTO", async () => {
    const result = await getClient(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      fullName: "Client 1",
      email: "client-1@test.com",
      phoneNumber: "123-456-7890",
      imageUrl: "/man.jpg",
      publicLink: "https://example.com/client-1",
      bio: "Client 1 bio",
      companyId: 1,
    });
  });

  it("should return null", async () => {
    const failure = await getClient(999);
    expect(failure).toBeNull();
  });
});
