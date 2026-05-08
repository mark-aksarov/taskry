import {
  PageStateContainer,
  PageStateContainerProps,
} from "./PageStateContainer";
import { Button } from "@/ui/Button";

interface NotFoundPageContainerProps
  extends Omit<PageStateContainerProps, "button"> {
  linkLabel?: string;
  linkHref?: string;
}

export default function NotFoundPageContainer({
  linkLabel,
  linkHref,
  ...props
}: NotFoundPageContainerProps) {
  return (
    <PageStateContainer
      button={
        <Button
          as="a"
          size="medium"
          href={linkHref}
          variant="secondary"
          outlined
          label={linkLabel}
        />
      }
      {...props}
    />
  );
}
