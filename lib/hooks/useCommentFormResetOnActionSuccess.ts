import { useEffect } from "react";
import { ActionState } from "../actions/types";
import { useCommentFormContext } from "@/components/comments/CommentFormContext";

export function useCommentFormResetOnActionSuccess(state: ActionState) {
  const { setCommentContent } = useCommentFormContext();

  useEffect(() => {
    if (state.status === "success") {
      setCommentContent("");
    }
  }, [state, setCommentContent]);
}
