import { Link } from "@/ui/Link";
import { LinkProps } from "react-aria-components";

export function AuthLink(props: LinkProps) {
  return <Link {...props} className="font-bold" variant="primary" />;
}
