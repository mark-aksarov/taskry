import { Button, ButtonProps } from "@/components/ui/Button";

export function DetailModalLink(props: ButtonProps<"a">) {
  return (
    <Button
      as="a"
      variant="primary"
      size="medium"
      className="w-full justify-center"
      {...props}
    />
  );
}
