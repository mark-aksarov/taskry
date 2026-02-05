import { Button, ButtonProps } from "@/components/ui/Button";

export function FormBaseModalSubmitButton(props: ButtonProps) {
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
