import { useEffect } from "react";
import { useSWRConfig } from "swr";
import { ActionState } from "../actions/types";
import { useCommentFormContext } from "@/components/comments/CommentFormContext";

export function useRefreshCommentsOnActionSuccess(state: ActionState) {
  const { mutateUrl } = useCommentFormContext();
  const { mutate } = useSWRConfig();

  useEffect(() => {
    if (state.status === "success") {
      mutate(mutateUrl);
    }
  }, [state, mutate, mutateUrl]);
}
