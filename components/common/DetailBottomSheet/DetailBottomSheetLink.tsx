import { Button, ButtonProps } from "@/components/ui/Button";

interface DetailBottomSheetLinkProps extends ButtonProps<"a"> {
  "data-test"?: string;
}

export function DetailBottomSheetLink(props: DetailBottomSheetLinkProps) {
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
