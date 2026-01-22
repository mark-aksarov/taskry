import { Button, ButtonProps } from "@/components/ui";

export function DetailBottomSheetLink(props: ButtonProps<"a">) {
  return (
    <Button
      data-test="detail-bottomsheet-link"
      as="a"
      variant="primary"
      size="medium"
      className="w-full justify-center"
      {...props}
    />
  );
}
