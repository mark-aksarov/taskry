import { BaseLink } from "@/ui/BaseLink";

const styles = "max-w-full flex items-center gap-2.5";

// Text only
interface GridItemContactProps {
  children: React.ReactNode;
}

export function GridItemContact({ children }: GridItemContactProps) {
  return <div className={styles}>{children}</div>;
}

// Link
interface GridItemContactLinkProps extends GridItemContactProps {
  href: string;
}

export function GridItemContactLink({
  href,
  children,
}: GridItemContactLinkProps) {
  return (
    <BaseLink className={styles} href={href}>
      {children}
    </BaseLink>
  );
}
