import { useMemo, useState } from "react";

export type ImageFileContextType = {
  imageFile: File | null;
  onImageFileChange: (open: File | null) => void;
} | null;

export function useImageFileContextValue() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const contextValue = useMemo(
    () => ({
      imageFile,
      onImageFileChange: setImageFile,
    }),
    [imageFile],
  );

  return contextValue;
}
