import prisma from "@/lib/prisma";
import { SearchKeywordDTO } from "./searchKeyword.dto";

export async function getSearchKeywords({
  query,
  limit = 10,
}: {
  query?: string;
  limit?: number;
} = {}): Promise<SearchKeywordDTO[]> {
  const keywords = await prisma.searchKeyword.findMany({
    where: query
      ? {
          word: {
            startsWith: query,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: [
      {
        usage: "desc",
      },
      {
        word: "asc",
      },
    ],
    take: limit,
  });

  return keywords.map((k) => ({ word: k.word }));
}
