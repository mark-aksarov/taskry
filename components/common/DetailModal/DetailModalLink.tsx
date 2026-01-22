import { Button, ButtonProps } from "@/components/ui";

export function DetailModalLink(props: ButtonProps<"a">) {
  return (
    <Button
      data-test="detail-modal-link"
      as="a"
      variant="primary"
      size="medium"
      className="w-full justify-center"
      {...props}
    />
  );
}
