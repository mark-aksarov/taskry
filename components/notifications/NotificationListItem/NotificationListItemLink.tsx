import Link from "next/link";
import { tv } from "tailwind-variants";
import { default as NextLink } from "next/link";
import { focusRing } from "@/components/ui/styles";

const styles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 focus-visible:outline-2",
});

interface NotificationListItemLinkProps
  extends React.ComponentProps<typeof NextLink> {
  children: React.ReactNode;
}

export function NotificationListItemLink({
  children,
  ...props
}: NotificationListItemLinkProps) {
  return (
    <Link {...props} className={styles()}>
      {children}
    </Link>
  );
}
