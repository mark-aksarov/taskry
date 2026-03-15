import useSWR from "swr";
import { SearchKeywordDTO } from "@/lib/data/searchKeyword/searchKeyword.dto";

export function useFetchSearchKeywords(query?: string) {
  const url = query ? `/api/search?query=${query}` : `/api/search`;

  return useSWR<SearchKeywordDTO[]>(url, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
}
