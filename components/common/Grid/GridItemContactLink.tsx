import { focusRing } from "@/components/ui";
import Link from "next/link";
import { tv } from "tailwind-variants";

interface GridItemContactLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}
const styles = tv({
  extend: focusRing,
  base: "not:focus-visible:outline-0 contents focus-visible:outline-2",
});

export function GridItemContactLink({
  children,
  ...props
}: GridItemContactLinkProps) {
  return (
    <Link {...props} className={styles()}>
      {children}
    </Link>
  );
}
