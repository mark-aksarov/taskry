import { useState } from "react";
import { UpdateCustomerImageContext } from "../UpdateCustomerImageContext";

export function MockedUpdateCustomerImageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <UpdateCustomerImageContext.Provider
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
    </UpdateCustomerImageContext.Provider>
  );
}
