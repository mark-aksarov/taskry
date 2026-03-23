import { useState } from "react";
import { UpdateUserImageContext } from "../UpdateUserImageContext";

export function MockedUpdateUserImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <UpdateUserImageContext.Provider
      value={{
        state: { status: "success" },
        action: () => ({ status: "success" }),
        isPending: false,
        isModalOpen,
        onModalOpenChange: setIsModalOpen,
        imageFile,
        onImageFileChange: setImageFile,
      }}
    >
      {children}
    </UpdateUserImageContext.Provider>
  );
}
