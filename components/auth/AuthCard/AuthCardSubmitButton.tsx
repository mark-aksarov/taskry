import { Button, ButtonProps } from "@/components/ui/Button";

export function AuthCardSubmitButton(props: ButtonProps) {
  return (
    <Button
      type="submit"
      size="medium"
      className="justify-center py-4"
      {...props}
    />
  );
}
