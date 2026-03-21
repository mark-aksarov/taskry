import { Link, LinkProps } from "@/components/ui/Link";

export function AuthLink(props: LinkProps) {
  return <Link {...props} className="text-sm font-bold" variant="primary" />;
}
