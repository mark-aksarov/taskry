"use client";

import { Link } from "../ui";
import { LinkProps } from "../ui/Link/Link";

export function AuthCardFooterLink(props: LinkProps) {
  return <Link {...props} className="text-sm font-bold" variant="primary" />;
}
