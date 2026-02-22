import { Button, ButtonProps } from "@/components/ui/Button";

export function FormBaseSubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      variant="primary"
      size="medium"
      className="w-full justify-center px-0"
      {...props}
    />
  );
}
