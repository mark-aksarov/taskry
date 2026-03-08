import { useSWRConfig } from "swr";
import { useCallback } from "react";
import { useCommentFormContext } from "@/components/comments/CommentFormContext";

/**
 * Refresh comments
 * They will be revalidated with useSWR in TaskCommentsContainer / ProjectCommentsContainer
 */
export function useRefreshComments() {
  const { mutateUrl } = useCommentFormContext();
  const { mutate } = useSWRConfig();

  return useCallback(() => mutate(mutateUrl), [mutate, mutateUrl]);
}
