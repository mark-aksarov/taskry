import {
  PageStateContainer,
  PageStateContainerProps,
} from "../dashboard/layout/PageStateContainer";
import { ButtonLink } from "@/ui/Button";

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
        <ButtonLink
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
