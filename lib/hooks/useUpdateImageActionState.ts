import { useRouter } from "@/i18n/navigation";
import { ActionState } from "../actions/types";
import { useActionState, useMemo } from "react";
import { uploadImageToS3 } from "../utils/uploadImageToS3";

const initialState: ActionState = {
  status: null,
};

type TId = number | string;

interface UpdateImageActionPayloadType<T extends TId> {
  id: T;
  blob: Blob;
}

interface UpdateImageUrlPayload<T extends TId> {
  id: T;
  imageUrl: string | null;
}

/**
 * Handles the full image update flow:
 * uploads the image to S3, saves the new image URL in the database,
 * and refreshes the page on success.
 */
export function useUpdateImageActionState<T extends TId>(
  updateImageUrl: (payload: UpdateImageUrlPayload<T>) => Promise<ActionState>,
) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(
    async (
      _prevState: ActionState,
      { id, blob }: UpdateImageActionPayloadType<T>,
    ) => {
      // create presigned url, then upload image to S3
      const uploadImageState = await uploadImageToS3(blob);

      if (uploadImageState.status === "error") {
        return {
          status: "error",
          message: uploadImageState.message,
        } as ActionState;
      }

      // update customer image url in database
      const { url, fields } = uploadImageState.presignedPost!;
      const updateImageUrlState = await updateImageUrl({
        id,
        imageUrl: `${url}/${fields.key}`,
      });

      if (updateImageUrlState.status === "success") {
        // router.refresh is wrapped in startTransition internally
        // when success we need to refresh page to show new image
        router.refresh();
      }

      return updateImageUrlState;
    },
    initialState,
  );

  return useMemo(
    () => ({ state, action, isPending }),
    [state, action, isPending],
  );
}
