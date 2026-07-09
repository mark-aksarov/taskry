import { getUserSummaries } from "../user.dal";
import { seed } from "@/prisma/test-seed";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, workspaces } from "@/prisma/seed/test-data";

describe("getUserSummaries", () => {
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

  it("should return all users", async () => {
    const result = await getUserSummaries();

    expect(result).toHaveLength(3);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          id: "user-1",
          fullName: "User 1",
        },
        {
          id: "user-2",
          fullName: "User 2",
        },
        {
          id: "user-3",
          fullName: "User 3",
        },
      ]),
    );
  });
});
