import { useTheme } from "next-themes";
import AvatarEditor from "react-avatar-editor";

interface UpdatePersonImageDialogProps {
  ref: React.RefObject<AvatarEditor | null>;
  imageFile: File;
}

export function UpdatePersonImageEditor({
  ref,
  imageFile,
}: UpdatePersonImageDialogProps) {
  const { theme } = useTheme();

  return (
    <AvatarEditor
      ref={ref}
      image={imageFile}
      width={300}
      height={300}
      border={50}
      borderRadius={150}
      color={theme === "dark" ? [30, 41, 57, 0.6] : [255, 255, 255, 0.6]}
      scale={1.2}
      rotate={0}
    />
  );
}
