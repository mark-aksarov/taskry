import prisma from "@/lib/prisma";
import { seed } from "@/prisma/test-seed";
import { loginAs } from "@/lib/test-utils/auth";
import { exportPositions } from "../position.dal";
import { members } from "@/prisma/seed/test-data";
import { users, organizations } from "@/prisma/seed/test-data";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";
import { it, expect, describe, beforeAll, afterEach } from "vitest";

describe("exportPositions", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      organizations,
      members,
      positions: [
        { id: 1, name: "Position 1", organizationId: "org-1" },
        { id: 2, name: "Position 2", organizationId: "org-2" },
        { id: 3, name: "Position 3", organizationId: "org-1" },
      ],
      users,
    });

    await loginAs("user-1");
  });

  afterEach(async () => {
    await prisma.position.deleteMany();
  });

  it("should return all positions as a list of valid PositionCsvDTOs", async () => {
    const result = await exportPositions();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          name: "Position 1",
        },
        {
          name: "Position 3",
        },
      ]),
    );
  });

  it("should return empty array", async () => {
    const result = await exportPositions();
    expect(result).toHaveLength(0);
  });
});
