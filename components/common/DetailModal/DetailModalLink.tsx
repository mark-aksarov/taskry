import { Button, ButtonProps } from "@/components/ui/Button";

interface DetailModalLinkProps extends ButtonProps<"a"> {
  "data-test"?: string;
}

export function DetailModalLink(props: DetailModalLinkProps) {
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
