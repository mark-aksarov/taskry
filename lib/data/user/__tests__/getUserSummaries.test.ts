import {
  seedUsers,
  seedPositions,
  seedWorkspaces,
} from "@/lib/data/utils/test-utils";

import { getUserSummaries } from "../user.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getUserSummaries", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
  });

  it("should return all users", async () => {
    const result = await getUserSummaries();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          fullName: "User 1",
        },
        {
          id: 2,
          fullName: "User 2",
        },
      ]),
    );
  });
});
