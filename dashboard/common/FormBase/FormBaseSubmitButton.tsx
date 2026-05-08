import { Button, ButtonProps } from "@/ui/Button";

export function FormBaseSubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      size="medium"
      variant="accent"
      className="w-full justify-center px-0"
      {...props}
    />
  );
}
