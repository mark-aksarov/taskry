import { Button } from "@/components/ui";

interface ConfirmModalProps {
  label: string;
  onConfirm: () => void;
}

export function ConfirmModalConfirmButton({
  label,
  onConfirm,
}: ConfirmModalProps) {
  const handlePress = () => onConfirm();

  return (
    <Button
      variant="contrast"
      label={label}
      onPress={handlePress}
      size="medium"
      className="py-2"
    />
  );
}
