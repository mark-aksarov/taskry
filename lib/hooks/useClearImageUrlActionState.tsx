import { useActionState } from "react";
import { useRouter } from "@/i18n/navigation";
import { ActionFn, ActionState } from "@/lib/actions/types";

export const initialState: ActionState = {
  status: null,
};

// id can be a number (most entities) or a string (user)
type TId = number | string;

// To clear imageUrl, we use updateImageUrl server action, which sets it to null
interface UpdateImagePayload<T extends TId> {
  id: T;
  imageUrl: string | null;
}

/**
 * Shared hook which call server action which set imageUrl to null
 */
export function useClearImageUrlActionState<T extends TId>(
  updateImageUrl: ActionFn<ActionState, UpdateImagePayload<T>>,
) {
  const router = useRouter();

  return useActionState(async (state: ActionState, id: T) => {
    const newState = await updateImageUrl(state, {
      id,
      imageUrl: null,
    });

    if (newState.status === "success") {
      // router.refresh is wrapped in startTransition internally
      // we need refresh profile page to show new image
      router.refresh();
    }

    return newState;
  }, initialState);
}
