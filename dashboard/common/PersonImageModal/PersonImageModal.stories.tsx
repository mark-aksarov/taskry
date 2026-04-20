import {
  PersonImageModal,
  UpdatePersonImageEditor,
  UpdatePersonImageDialogBody,
  UpdatePersonImageErrorBanner,
  UpdatePersonImageActionButton,
  UpdatePersonImageDialogHeader,
} from "../PersonImageModal";

import { useRef, useState } from "react";
import { Button } from "@/ui/Button";
import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Dialog, DialogFooter } from "@/ui/Dialog";
import { withThemedBackground } from "@/.storybook/withThemedBackground";

const meta = {
  title: "dashboard/common/PersonImageModal",
  component: PersonImageModal,
  decorators: [withThemedBackground],
  render: () => {
    const editorRef = useRef(null);
    const [isOpen, setIsOpen] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);

    return (
      <>
        <Button onPress={() => setIsOpen(true)} label="Change image" />
        <PersonImageModal
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          imageFile={imageFile}
          onImageFileChange={setImageFile}
          updatePersonImageDialog={
            <Dialog>
              <UpdatePersonImageDialogHeader setImageFile={setImageFile} />
              <UpdatePersonImageDialogBody>
                <UpdatePersonImageEditor
                  ref={editorRef}
                  imageFile={imageFile!}
                />
                <UpdatePersonImageErrorBanner
                  updatePersonImageState={{ status: "success" }}
                  isUpdatePersonImagePending={false}
                />
              </UpdatePersonImageDialogBody>
              <DialogFooter>
                <UpdatePersonImageActionButton
                  editorRef={editorRef}
                  imageFile={imageFile!}
                  updatePersonImageAction={() => {}}
                  isUpdatePersonImagePending={false}
                />
              </DialogFooter>
            </Dialog>
          }
        />
      </>
    );
  },
} satisfies Meta<typeof PersonImageModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    isOpen: true,
    onOpenChange: () => {},
    imageFile: null,
    onImageFileChange: () => {},
    updatePersonImageDialog: null,
  },
} satisfies Story;
