import { seed } from "@/prisma/test-seed";
import { getUserSummaries } from "../user.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("getUserSummaries", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions,
      users,
    });

    await loginAs("user-1");
  });

  it("should return all users", async () => {
    const result = await getUserSummaries();

    expect(result).toHaveLength(2);
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
      ]),
    );
  });
});
