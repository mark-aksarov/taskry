import {
  users,
  members,
  clients,
  positions,
  companies,
  organizations,
  taskCategories,
  projectCategories,
} from "@/prisma/seed/test-data";

import { seed } from "@/prisma/test-seed";
import { exportClients } from "../client.dal";
import { setupAuth } from "@/lib/test-utils/auth";
import { it, expect, describe, beforeAll } from "vitest";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("exportClients", () => {
  beforeAll(async () => {
    await resetDatabase();

    await seed({
      users,
      clients,
      members,
      companies,
      positions,
      organizations,
      taskCategories,
      projectCategories,
    });

    await setupAuth("user-1");
  });

  it("should return clients with valid ClientCsvDTO", async () => {
    const result = await exportClients();

    expect(result).toStrictEqual([
      {
        bio: "Client 1 bio",
        fullName: "Client 1",
        email: "client-1@test.com",
        imageUrl: "/man.jpg",
        phoneNumber: "123-456-7890",
        publicLink: "https://example.com/client-1",
        companyName: "Company 1",
      },
      {
        bio: "Client 2 bio",
        fullName: "Client 2",
        email: "client-2@test.com",
        imageUrl: "/man.jpg",
        phoneNumber: "987-654-3210",
        publicLink: "https://example.com/client-2",
        companyName: "Company 1",
      },
    ]);
  });
});
