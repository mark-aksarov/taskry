import { seed } from "@/prisma/test-seed";
import { getUserDetail } from "../user.dal";
import { loginAs } from "@/lib/test-utils/auth";
import { members } from "@/prisma/seed/test-data";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { users, positions, organizations } from "@/prisma/seed/test-data";

describe("getUserDetail", () => {
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

  it("should succsessfully return a valid UserDetailDTO", async () => {
    const result = await getUserDetail("user-1");

    expect(result).toBeDefined();
    expect(result).toMatchObject({
      id: "user-1",
      fullName: "User 1",
      email: "user-1@test.com",
      phoneNumber: "phone 1",
      imageUrl: "/man.jpg",
      publicLink: "https://example.com/user-1",
      bio: "user 1 bio",
      address: "address user 1",
      position: {
        name: "Position 1",
      },
    });
  });

  it("should return null if user id does not exist", async () => {
    const result = await getUserDetail("user-999");
    expect(result).toBeNull();
  });
});
