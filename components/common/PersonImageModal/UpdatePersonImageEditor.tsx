import AvatarEditor from "react-avatar-editor";

interface UpdatePersonImageDialogProps {
  ref: React.RefObject<AvatarEditor | null>;
  imageFile: File;
}

export function UpdatePersonImageEditor({
  ref,
  imageFile,
}: UpdatePersonImageDialogProps) {
  return (
    <AvatarEditor
      ref={ref}
      image={imageFile}
      width={300}
      height={300}
      border={50}
      borderRadius={150}
      color={[255, 255, 255, 0.6]}
      scale={1.2}
      rotate={0}
    />
  );
}
