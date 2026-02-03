import {
  seedUsers,
  seedPositions,
  seedWorkspaces,
} from "@/lib/data/utils/test-utils";

import { getUserDetail } from "../user.dal";
import { resetDatabase } from "@/prisma/resetDatabase";
import { it, expect, describe, beforeAll } from "vitest";
import { requireSession } from "@/lib/data/utils/requireSession";

describe("getUserDetail", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();
    await seedWorkspaces();
    await seedPositions();
    await seedUsers();
  });

  it("should succsessfully return a valid UserDetailDTO", async () => {
    const result = await getUserDetail("user-1");

    expect(result).toBeDefined();
    expect(result).toMatchObject({
      id: "user-1",
      fullName: "User 1",
      email: "user-1@test.com",
      phoneNumber: "phone 1",
      imageUrl: "https://example.com/user-1.jpg",
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
