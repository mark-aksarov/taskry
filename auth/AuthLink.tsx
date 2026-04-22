import { TextLink } from "@/common/TextLink";
import { LinkProps } from "react-aria-components";

export function AuthLink(props: LinkProps) {
  return <TextLink {...props} className="font-bold" />;
}
