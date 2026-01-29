import { Button, ButtonProps } from "@/components/ui/Button";

export function SubtaskFormDialogSubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="medium"
      className="w-full justify-center p-3"
      {...props}
    />
  );
}
