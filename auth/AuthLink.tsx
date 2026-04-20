import { Link, LinkProps } from "@/ui/Link";

export function AuthLink(props: LinkProps) {
  return <Link {...props} className="text-sm font-bold" variant="primary" />;
}
