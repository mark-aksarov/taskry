import { seed } from "@/prisma/test-seed";
import { getSearchKeywords } from "../searchKeyword.dal";
import { it, expect, describe, beforeAll } from "vitest";
import { searchKeywords } from "@/prisma/seed/test-data";
import { requireSession } from "@/lib/data/utils/requireSession";
import { resetDatabase } from "@/lib/test-utils/resetDatabase";

describe("getSearchKeywords", () => {
  beforeAll(async () => {
    (requireSession as any).mockResolvedValue({
      user: { id: "user-1", workspaceId: 1 },
    });

    await resetDatabase();

    await seed({
      searchKeywords,
    });
  });

  it("should return most popular search keywords", async () => {
    const result = await getSearchKeywords({ limit: 5 });

    expect(result).toHaveLength(5);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          word: "Keyword 16",
        },
        {
          word: "Keyword 17",
        },
        {
          word: "Keyword 18",
        },
        {
          word: "Keyword 19",
        },
        {
          word: "Keyword 20",
        },
      ]),
    );
  });

  it("should return filtered search keywords", async () => {
    const result = await getSearchKeywords({ query: "KEYWORD 1", limit: 7 });

    expect(result).toHaveLength(7);
    expect(result).toEqual(
      expect.arrayContaining([
        {
          word: "Keyword 16",
        },
        {
          word: "Keyword 17",
        },
        {
          word: "Keyword 18",
        },
        {
          word: "Keyword 19",
        },
        {
          word: "Keyword 1",
        },
        {
          word: "Keyword 10",
        },
      ]),
    );
  });
});
