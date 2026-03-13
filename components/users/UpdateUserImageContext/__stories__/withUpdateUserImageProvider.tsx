import { useState } from "react";
import { type Decorator } from "@storybook/react";
import { UserImageModal } from "../../UserImageModal";
import { UpdateUserImageContext } from "../UpdateUserImageContext";

export const withUpdateUserImageProvider: Decorator = (Story) => {
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
      <Story />
      <UserImageModal userId="user-1" />
    </UpdateUserImageContext.Provider>
  );
};
