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
import { getClientDetail } from "../client.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getClientDetail", () => {
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
      workspaceId: 1,

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
