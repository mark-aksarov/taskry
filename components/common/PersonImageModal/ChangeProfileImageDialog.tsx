import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/Dialog";
import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import AvatarEditor from "react-avatar-editor";
import { Button } from "@/components/ui/Button";

interface ChangeProfileImageDialogProps {
  imageFile: File;
  setImageFile: (file: File | null) => void;
}

export function ChangeProfileImageDialog({
  imageFile,
  setImageFile,
}: ChangeProfileImageDialogProps) {
  const t = useTranslations("common.ChangeProfileImageDialog");

  return (
    <Dialog>
      <DialogHeader>
        <div className="flex items-center gap-4">
          <Button
            onPress={() => setImageFile(null)}
            variant="outlined"
            iconLeft={
              <ChevronLeft size={16} absoluteStrokeWidth strokeWidth={1.5} />
            }
          />
          {t("heading")}
        </div>
      </DialogHeader>
      <DialogBody className="flex items-center justify-center overflow-hidden">
        <AvatarEditor
          image={imageFile}
          width={300}
          height={300}
          border={50}
          borderRadius={150}
          color={[255, 255, 255, 0.6]}
          scale={1.2}
          rotate={0}
        />
      </DialogBody>
      <DialogFooter>
        <Button
          variant="primary"
          size="medium"
          label={t("save")}
          className="w-full justify-center"
        />
      </DialogFooter>
    </Dialog>
  );
}
