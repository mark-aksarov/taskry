import { type Decorator } from "@storybook/react";
import { UpdateCustomerImageContext } from "../UpdateCustomerImageContext";
import { useState } from "react";
import { CustomerImageModal } from "../../CustomerImageModal";

export const withUpdateCustomerImageProvider: Decorator = (Story) => {
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
      <Story />
      <CustomerImageModal customerId={1} />
    </UpdateCustomerImageContext.Provider>
  );
};
