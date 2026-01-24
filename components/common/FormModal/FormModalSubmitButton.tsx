import { Button, ButtonProps } from "@/components/ui/Button";

export function FormModalSubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="medium"
      className="w-full justify-center"
      {...props}
    />
  );
}
