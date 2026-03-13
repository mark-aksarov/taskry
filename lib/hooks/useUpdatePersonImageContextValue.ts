import {
  ActionFn,
  ActionState,
  ActionContextType,
  CreatePresignedUrlState,
} from "@/lib/actions/types";

import { useRouter } from "@/i18n/navigation";
import { useMemo, useState, useActionState } from "react";

const initialState: ActionState = {
  status: null,
};

type TId = number | string;

// UpdatePersonImagePayload is used when we update imageUrl in database
type UpdatePersonImagePayload<T extends TId> = {
  id: T;
  imageUrl: string;
};

// action payload is used to collect all our actions in single reducerAction
type ActionPayload<T extends TId> = {
  id: T;
  blob: Blob;
};

/**
 * Shared hook for updating image for user or customer
 */
export function useUpdatePersonImageContextValue<T extends TId>(
  createPresignedUrl: ActionFn<CreatePresignedUrlState, void>,
  updatePersonImageUrl: ActionFn<ActionState, UpdatePersonImagePayload<T>>,
) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [state, action, isPending] = useActionState<
    ActionState,
    ActionPayload<T>
  >(async (state, { id, blob }) => {
    /**
     * Step 1: Create presigned URL
     */
    const createUrlState = await createPresignedUrl(state);

    if (createUrlState.status === "error") {
      return {
        status: "error",
        message: createUrlState.message,
      };
    }

    const { url, fields } = createUrlState.presignedPost!;

    /**
     * Step 2: Upload image to S3
     */
    const formData = new FormData();

    for (const key in fields) {
      formData.append(key, fields[key]);
    }

    formData.append("file", blob);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      // HTTP error (400 / 500)
      if (!response.ok) {
        return { status: "error" };
      }
    } catch {
      // network / CORS error
      return { status: "error" };
    }

    /**
     * Step 3: Update image URL in database
     */
    const updateState = await updatePersonImageUrl(state, {
      id,
      imageUrl: `${url}/${fields.key}`,
    });

    if (updateState.status === "error") {
      return {
        status: "error",
        message: updateState.message,
      };
    }

    router.refresh();

    return { status: "success", message: updateState.message };
  }, initialState);

  const contextValue = useMemo(
    () => ({
      isModalOpen,
      onModalOpenChange: setIsModalOpen,
      state,
      action,
      isPending,
      imageFile,
      onImageFileChange: setImageFile,
    }),
    [isModalOpen, state, action, isPending, imageFile],
  );

  return contextValue;
}

export interface UpdatePersonImageContextType<T extends TId>
  extends ActionContextType<ActionPayload<T>> {
  isModalOpen: boolean;
  onModalOpenChange: (isOpen: boolean) => void;
  imageFile: File | null;
  onImageFileChange: (file: File | null) => void;
}
