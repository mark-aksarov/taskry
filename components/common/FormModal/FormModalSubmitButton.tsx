import { Button, ButtonProps } from "@/components/ui";

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
