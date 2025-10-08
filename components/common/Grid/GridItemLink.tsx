import Link from "next/link";
import { tv } from "tailwind-variants";
import { focusRing } from "@/components/ui";
import { default as NextLink } from "next/link";

const styles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 focus-visible:outline-2",
});

interface GridItemLinkProps extends React.ComponentProps<typeof NextLink> {
  children: React.ReactNode;
}

export function GridItemLink({ children, ...props }: GridItemLinkProps) {
  return (
    <Link {...props} className={styles()}>
      {children}
    </Link>
  );
}
