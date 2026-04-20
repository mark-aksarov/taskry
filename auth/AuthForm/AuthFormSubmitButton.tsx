import { Button, ButtonProps } from "@/ui/Button";

export function AuthFormSubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      size="medium"
      className="justify-center py-4"
      {...props}
    />
  );
}
