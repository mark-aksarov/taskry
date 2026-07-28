import { useMemo } from "react";

export function useUpdateImageActionState() {
  return useMemo(
    () => ({
      state: {
        status: null,
      },
      action: () => ({
        status: "success",
        message: "Image updated successfully",
      }),
      isPending: false,
    }),
    [],
  );
}
