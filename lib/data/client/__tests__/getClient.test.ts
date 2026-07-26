import {
  users,
  members,
  clients,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClient } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClient", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      positions,
      users,
      members,
      companies,
      taskCategories,
      projectCategories,
      clients,
    });

    await setupAuth("user-1");
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
