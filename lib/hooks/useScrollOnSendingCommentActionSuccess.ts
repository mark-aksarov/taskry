import { useEffect, RefObject, useRef } from "react";
import { useSendComment } from "@/components/comments/SendCommentContext";

/**
 * Hook that scrolls a given ref to top when sending a comment succeeds.
 * ref - Ref of the scrollable container
 */
export function useScrollOnSendingCommentActionSuccess(
  ref: RefObject<HTMLElement | null>,
) {
  const { state } = useSendComment();
  const prevStateRef = useRef<typeof state | null>(null);

  useEffect(() => {
    if (state !== prevStateRef.current) {
      prevStateRef.current = state;

      if (state.status === "success") {
        ref.current?.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [state, ref]);
}
