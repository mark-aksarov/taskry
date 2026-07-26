import {
  users,
  clients,
  members,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { getClientDetail } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getClientDetail", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      users,
      clients,
      members,
      positions,
      companies,
      organizations,
      taskCategories,
      projectCategories,
    });

    await setupAuth("user-1");
  });

  it("should return a valid ClientDetailDTO", async () => {
    const result = await getClientDetail(1);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      id: 1,
      fullName: "Client 1",
      email: "client-1@test.com",
      phoneNumber: "123-456-7890",
      imageUrl: "/man.jpg",
      publicLink: "https://example.com/client-1",
      bio: "Client 1 bio",

      company: {
        name: "Company 1",
      },
    });
  });

  it("should return null", async () => {
    const failure = await getClientDetail(999);
    expect(failure).toBeNull();
  });
});
