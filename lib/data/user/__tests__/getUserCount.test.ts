import {
  seedUsers,
  seedWorkspaces,
  seedPositions,
} from "@/lib/data/utils/test-utils";

import { getUserCount } from "../user.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getUserCount", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
  });

  it("should return total count of users", async () => {
    const count = await getUserCount();
    expect(count).toBe(3);
  });
});
