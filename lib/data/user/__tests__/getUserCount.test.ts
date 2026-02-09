import { getUserCount } from "../user.dal";
import { seed } from "@/prisma/test-utils/seed";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/prisma/test-utils/resetDatabase";
import { users, positions, workspaces } from "@/prisma/test-utils/data";

describe("getUserCount", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      workspaces,
      positions,
      users,
    });
  });

  it("should return total count of users", async () => {
    const count = await getUserCount();
    expect(count).toBe(3);
  });
});
