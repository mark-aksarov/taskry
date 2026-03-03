import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useCommentFormContext } from "@/components/comments/CommentFormContext";

export function useClearEditCommentIdOnActionSuccess(state: ActionState) {
  const { setEditCommentId } = useCommentFormContext();

  useEffect(() => {
    if (state.status === "success") {
      setEditCommentId(undefined);
    }
  }, [state, setEditCommentId]);
}
