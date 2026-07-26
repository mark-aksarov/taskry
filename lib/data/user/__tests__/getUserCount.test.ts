import { seed } from "@/prisma/test-seed";
import { getUserCount } from "../user.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("getUserCount", () => {
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

  it("should return total count of users", async () => {
    const count = await getUserCount();
    expect(count).toBe(2);
  });
});
