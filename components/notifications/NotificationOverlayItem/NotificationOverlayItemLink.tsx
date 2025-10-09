import Link from "next/link";
import { tv } from "tailwind-variants";
import { focusRing } from "@/components/ui";
import { default as NextLink } from "next/link";

const styles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 focus-visible:outline-2",
});

interface NotificationOverlayItemLinkProps
  extends React.ComponentProps<typeof NextLink> {
  children: React.ReactNode;
}

export function NotificationOverlayItemLink({
  children,
  ...props
}: NotificationOverlayItemLinkProps) {
  return (
    <Link {...props} className={styles()}>
      {children}
    </Link>
  );
}
