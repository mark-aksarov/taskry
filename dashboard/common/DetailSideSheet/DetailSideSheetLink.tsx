import { ButtonLink, ButtonLinkProps } from "@/ui/Button";

export function DetailSideSheetLink(props: ButtonLinkProps) {
  return (
    <ButtonLink
      variant="accent"
      size="medium"
      className="w-full justify-center"
      {...props}
    />
  );
}
