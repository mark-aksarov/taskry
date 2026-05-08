import { Button, ButtonProps } from "@/ui/Button";

interface DetailSideSheetLinkProps extends ButtonProps<"a"> {
  "data-test"?: string;
}

export function DetailSideSheetLink(props: DetailSideSheetLinkProps) {
  return (
    <Button
      as="a"
      variant="accent"
      size="medium"
      className="w-full justify-center"
      {...props}
    />
  );
}
